const { Connection, Request, TYPES } = require('tedious');
const { config } = require('../config/db');

async function checkCart(req, res, next) {
  const accountId = req.user.AccountID;
  
  if (!accountId) {
    return res.status(400).json({ error: 'Thiếu thông tin tài khoản' });
  }

  let connection;

  try {
    connection = new Connection(config);

    await new Promise((resolve, reject) => {
      connection.on('connect', err => {
        if (err) return reject(err);
        resolve();
      });
      connection.connect();
    });

    // Kiểm tra có Cart hay chưa
    const cartId = await new Promise((resolve, reject) => {
      const request = new Request(
        `SELECT CartId FROM Cart WHERE AccountId = @AccountId`,
        (err) => {
          if (err) return reject(err);
        }
      );

      let found = null;

      request.addParameter('AccountId', TYPES.Int, accountId);
      request.on('row', (columns) => {
        found = columns[0].value;
      });
      request.on('requestCompleted', () => {
        resolve(found);
      });

      connection.execSql(request);
    });

    // Nếu chưa có thì tạo mới
    if (!cartId) {
      const newCartId = await new Promise((resolve, reject) => {
        const request = new Request(
          `INSERT INTO Cart (AccountId, CreatedAt) OUTPUT INSERTED.CartId VALUES (@AccountId, GETDATE())`,
          (err) => {
            if (err) return reject(err);
          }
        );

        let inserted = null;

        request.addParameter('AccountId', TYPES.Int, accountId);
        request.on('row', (columns) => {
          inserted = columns[0].value;
        });
        request.on('requestCompleted', () => {
          resolve(inserted);
        });

        connection.execSql(request);
      });

      req.cartId = newCartId;
    } else {
      req.cartId = cartId;
    }
    
    next();
  } catch (err) {
    console.error('Lỗi checkCart:', err);
    res.status(500).json({ error: 'Lỗi khi kiểm tra hoặc tạo giỏ hàng', details: err });
  } finally {
    if (connection) connection.close();
  }
}

module.exports = checkCart;