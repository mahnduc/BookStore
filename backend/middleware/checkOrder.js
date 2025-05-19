const { Connection, Request, TYPES } = require('tedious');
const { config } = require('../config/db');

const checkOrder = (req, res, next) => {
  const accountId = req.user.AccountID;

  if (!accountId) return res.status(401).json({ message: 'Chưa xác thực' });

  const connection = new Connection(config);

  connection.on('connect', (err) => {
    if (err) {
      console.error('Kết nối đến cơ sở dữ liệu thất bại:', err);
      return res.status(500).json({ message: 'Lỗi kết nối cơ sở dữ liệu' });
    }

    // 1. Kiểm tra đơn hàng có tồn tại không
    const selectRequest = new Request(
      `SELECT TOP 1 OrderID FROM [Order] WHERE AccountID = @AccountID ORDER BY OrderDate DESC`,
      (err, rowCount) => {
        if (err) {
          console.error('Lỗi khi chọn đơn hàng:', err);
          connection.close();
          return res.status(500).json({ message: 'Lỗi khi kiểm tra đơn hàng' });
        }

        // Nếu không có đơn hàng, tạo mới
        if (rowCount === 0) {
          const insertRequest = new Request(
            `INSERT INTO [Order] (AccountID, OrderDate, Note)
             OUTPUT INSERTED.OrderID
             VALUES (@AccountID, @OrderDate, @Note)`,
            (err) => {
              if (err) {
                console.error('Lỗi khi thêm đơn hàng:', err);
                connection.close();
                return res.status(500).json({ message: 'Lỗi khi tạo đơn hàng' });
              }
            }
          );

          const now = new Date();

          insertRequest.addParameter('AccountID', TYPES.Int, accountId);
          insertRequest.addParameter('OrderDate', TYPES.DateTime, now);
          insertRequest.addParameter('Note', TYPES.NVarChar, '');

          insertRequest.on('row', (columns) => {
            req.orderId = columns[0].value;
          });

          insertRequest.on('requestCompleted', () => {
            connection.close();
            next();
          });

          connection.execSql(insertRequest);
        }
      }
    );

    selectRequest.addParameter('AccountID', TYPES.Int, accountId);

    selectRequest.on('row', (columns) => {
      // Nếu có đơn hàng -> lưu OrderID vào req
      req.orderId = columns[0].value;
    });

    selectRequest.on('requestCompleted', () => {
      if (req.orderId) {
        connection.close();
        next();
      }
    });

    connection.execSql(selectRequest);
  });

  connection.connect();
};

module.exports = checkOrder;