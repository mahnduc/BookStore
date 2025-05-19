const { Connection, Request, TYPES } = require('tedious');
const { config } = require('../config/db');

const addOrderItemIntoOrder = (req, res) => {
  const accountID = req.user.AccountID;
  const orderID = req.orderId;
  const cartItemIDList = req.body.cartItemID;

  if (!Array.isArray(cartItemIDList) || cartItemIDList.length === 0) {
    return res.status(400).json({ message: 'Không có sản phẩm nào trong giỏ hàng' });
  }

  const connection = new Connection(config);
  connection.connect();

  connection.on('connect', (err) => {
    if (err) {
      console.error('Lỗi kết nối:', err);
      return res.status(500).json({ message: 'Kết nối cơ sở dữ liệu thất bại' });
    }

    connection.beginTransaction((err) => {
      if (err) {
        console.error('Lỗi bắt đầu giao dịch:', err);
        return res.status(500).json({ message: 'Không thể bắt đầu giao dịch' });
      }

      const cartItems = [];
      const cartItemParams = cartItemIDList.map((_, i) => `@CartItemID${i}`).join(', ');

      const request = new Request(
        `
          SELECT ci.CartItemID, ci.BookID, ci.Quantity, b.Price, b.Stock
          FROM CartItem ci
          INNER JOIN Cart c ON ci.CartID = c.CartID
          INNER JOIN Book b ON ci.BookID = b.BookID
          WHERE ci.CartItemID IN (${cartItemParams}) AND c.AccountID = @AccountID
        `,
        (err) => {
          if (err) {
            connection.rollbackTransaction(() => {});
            console.error('Lỗi khi lấy sản phẩm trong giỏ hàng:', err);
            return res.status(500).json({ message: 'Không thể lấy sản phẩm trong giỏ hàng' });
          }

          const outOfStockItems = cartItems.filter(item => item.Quantity > item.Stock);
          if (outOfStockItems.length > 0) {
            connection.rollbackTransaction(() => {
              return res.status(400).json({
                message: 'Một số sản phẩm đã hết hàng',
                outOfStock: outOfStockItems.map(i => i.BookID),
              });
            });
            return;
          }

          const insertNext = (index) => {
            if (index >= cartItems.length) {
              const deleteRequest = new Request(
                `DELETE FROM CartItem WHERE CartItemID IN (${cartItemParams})`,
                (err) => {
                  if (err) {
                    connection.rollbackTransaction(() => {});
                    console.error('Lỗi khi xoá sản phẩm trong giỏ hàng:', err);
                    return res.status(500).json({ message: 'Không thể xoá sản phẩm trong giỏ hàng' });
                  }

                  connection.commitTransaction((err) => {
                    if (err) {
                      console.error('Lỗi commit:', err);
                      return res.status(500).json({ message: 'Không thể commit giao dịch' });
                    }
                    res.status(200).json({ message: 'Đã tạo sản phẩm đơn hàng và cập nhật tồn kho thành công' });
                  });
                }
              );

              cartItemIDList.forEach((id, i) => {
                deleteRequest.addParameter(`CartItemID${i}`, TYPES.Int, id);
              });

              connection.execSql(deleteRequest);
              return;
            }

            const item = cartItems[index];
            const insertRequest = new Request(
              `
              INSERT INTO OrderItem (OrderID, BookID, Quantity, PriceAtPurchase)
              VALUES (@OrderID, @BookID, @Quantity, @PriceAtPurchase)
              `,
              (err) => {
                if (err) {
                  connection.rollbackTransaction(() => {});
                  console.error('Lỗi chèn OrderItem:', err);
                  return res.status(500).json({ message: 'Không thể chèn sản phẩm vào đơn hàng' });
                }

                // Sau khi insert OrderItem, cập nhật tồn kho
                const updateStockRequest = new Request(
                  `UPDATE Book SET Stock = Stock - @Quantity WHERE BookID = @BookID`,
                  (err) => {
                    if (err) {
                      connection.rollbackTransaction(() => {});
                      console.error('Lỗi khi cập nhật tồn kho:', err);
                      return res.status(500).json({ message: 'Không thể cập nhật tồn kho' });
                    }

                    // Tiếp tục xử lý sản phẩm tiếp theo
                    insertNext(index + 1);
                  }
                );

                updateStockRequest.addParameter('BookID', TYPES.Int, item.BookID);
                updateStockRequest.addParameter('Quantity', TYPES.Int, item.Quantity);
                connection.execSql(updateStockRequest);
              }
            );

            insertRequest.addParameter('OrderID', TYPES.Int, orderID);
            insertRequest.addParameter('BookID', TYPES.Int, item.BookID);
            insertRequest.addParameter('Quantity', TYPES.Int, item.Quantity);
            insertRequest.addParameter('PriceAtPurchase', TYPES.Decimal, item.Price);

            connection.execSql(insertRequest);
          };

          insertNext(0);
        }
      );

      cartItemIDList.forEach((id, i) => {
        request.addParameter(`CartItemID${i}`, TYPES.Int, id);
      });
      request.addParameter('AccountID', TYPES.Int, accountID);

      request.on('row', (columns) => {
        cartItems.push({
          CartItemID: columns[0].value,
          BookID: columns[1].value,
          Quantity: columns[2].value,
          Price: columns[3].value,
          Stock: columns[4].value
        });
      });

      connection.execSql(request);
    });
  });
};

const getPurchaseHistory = (req, res) => {
  const accountID = req.user.AccountID;

  const connection = new Connection(config);
  const orders = [];

  connection.on('connect', (err) => {
    if (err) {
      console.error('Database connection error:', err);
      return res.status(500).json({ message: 'Lỗi kết nối cơ sở dữ liệu' });
    }

    const request = new Request(
      `
      SELECT o.OrderID, o.OrderDate, oi.BookID, b.Title, oi.Quantity, oi.PriceAtPurchase
      FROM [Order] o
      JOIN OrderItem oi ON o.OrderID = oi.OrderID
      JOIN Book b ON b.BookID = oi.BookID
      WHERE o.AccountID = @AccountID
      ORDER BY o.OrderDate DESC
      `,
      (err) => {
        if (err) {
          console.error('Lỗi khi lấy lịch sử mua hàng:', err);
          return res.status(500).json({ message: 'Không thể lấy dữ liệu' });
        }

        res.status(200).json({ orders });
      }
    );

    request.addParameter('AccountID', TYPES.Int, accountID);

    request.on('row', (columns) => {
      const row = {};
      columns.forEach(col => {
        row[col.metadata.colName] = col.value;
      });
      orders.push(row);
    });

    connection.execSql(request);
  });

  connection.connect();
};

module.exports = { 
  addOrderItemIntoOrder, getPurchaseHistory
}