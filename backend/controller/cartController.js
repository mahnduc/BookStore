const { Connection, Request, TYPES } = require('tedious');
const { config } = require('../config/db');

async function addCartItemIntoCart(req, res) {
  const cartId = req.cartId;
  const bookId = req.body.BookID;
  const quantity = req.body.Quantity;
  console.log(cartId, bookId, quantity)
  if (!bookId || !quantity || quantity <= 0) {
    return res.status(400).json({ error: 'Thiếu BookID hoặc Quantity không hợp lệ' });
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

    // Kiểm tra item đã tồn tại chưa
    const existingItem = await new Promise((resolve, reject) => {
      const request = new Request(
        `SELECT CartItemId, Quantity FROM CartItem WHERE CartId = @CartId AND BookId = @BookId`,
        (err) => {
          if (err) return reject(err);
        }
      );

      request.addParameter('CartId', TYPES.Int, cartId);
      request.addParameter('BookId', TYPES.Int, bookId);

      let item = null;
      request.on('row', (columns) => {
        item = {};
        columns.forEach(col => item[col.metadata.colName] = col.value);
      });
      request.on('requestCompleted', () => resolve(item));

      connection.execSql(request);
    });

    if (existingItem) {
      // Cập nhật số lượng
      await new Promise((resolve, reject) => {
        const request = new Request(
          `UPDATE CartItem SET Quantity = Quantity + @Quantity, AddedAt = GETDATE() WHERE CartItemId = @CartItemId`,
          (err) => {
            if (err) return reject(err);
            resolve();
          }
        );

        request.addParameter('Quantity', TYPES.Int, quantity);
        request.addParameter('CartItemId', TYPES.Int, existingItem.CartItemId);

        connection.execSql(request);
      });

      res.status(200).json({ message: 'Cập nhật số lượng sản phẩm trong giỏ hàng thành công' });
    } else {
      // Thêm mới
      await new Promise((resolve, reject) => {
        const request = new Request(
          `INSERT INTO CartItem (CartId, BookId, Quantity, AddedAt) VALUES (@CartId, @BookId, @Quantity, GETDATE())`,
          (err) => {
            if (err) return reject(err);
            resolve();
          }
        );

        request.addParameter('CartId', TYPES.Int, cartId);
        request.addParameter('BookId', TYPES.Int, bookId);
        request.addParameter('Quantity', TYPES.Int, quantity);

        connection.execSql(request);
      });

      res.status(201).json({ message: 'Đã thêm sản phẩm vào giỏ hàng' });
    }

  } catch (err) {
    console.error('Lỗi khi thêm item:', err);
    res.status(500).json({ error: 'Lỗi khi thêm item vào giỏ hàng', details: err });
  } finally {
    if (connection) connection.close();
  }
}


async function getCartById(req, res) {
  const { AccountID } = req.user;
  let connection;

  try {
    connection = new Connection(config);

    await new Promise((resolve, reject) => {
      connection.on('connect', (err) => {
        if (err) {
          console.error('❌ Kết nối thất bại:', err);
          reject('Kết nối thất bại');
        } else {
          resolve();
        }
      });
      connection.on('error', reject);
      connection.connect();
    });

    const cartItems = await new Promise((resolve, reject) => {
      const items = [];

      const sql = `
        SELECT
            c.CartId,
            c.AccountId,
            c.CreatedAt,
            ci.CartItemId,
            ci.BookId,
            b.Title AS BookTitle,
            ci.Quantity,
            ci.AddedAt,
            b.Price AS BookPrice
        FROM
            Cart c
        JOIN
            CartItem ci ON c.CartId = ci.CartId
        JOIN
            Book b ON ci.BookId = b.BookId
        WHERE
            c.AccountId = @AccountID
      `;

      const request = new Request(sql, (err) => {
        if (err) {
          console.error('❌ Lỗi truy vấn:', err);
          reject('Truy vấn thất bại');
        } else {
          resolve(items);
        }
      });

      request.addParameter('AccountID', TYPES.Int, AccountID);

      request.on('row', (columns) => {
        const row = {};
        columns.forEach(col => {
          row[col.metadata.colName] = col.value;
        });
        items.push(row);
      });

      connection.execSql(request);
    });

    connection.close();

    if (cartItems.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy giỏ hàng hoặc giỏ hàng trống' });
    }

    res.status(200).json({
      AccountID,
      cart: cartItems
    });

  } catch (error) {
    console.error('❌ Lỗi khi lấy giỏ hàng:', error);
    res.status(500).json({ error: 'Lỗi máy chủ', details: error });

    if (connection) connection.close();
  }
}

function removeCartItem(req, res) {
  const accountId = req.user.AccountID;
  const { cartItemID } = req.body;

  if (!accountId) {
    return res.status(400).json({ error: 'Thiếu AccountID từ người dùng' });
  }

  if (!cartItemID) {
    return res.status(400).json({ error: 'Thiếu cartItemID trong request body' });
  }

  const connection = new Connection(config);

  connection.on('connect', (err) => {
    if (err) {
      console.error('Kết nối thất bại:', err);
      return res.status(500).json({ error: 'Không thể kết nối tới cơ sở dữ liệu' });
    }

    const deleteQuery = `
      DELETE ci
      FROM CartItem ci
      INNER JOIN Cart c ON ci.CartID = c.CartID
      WHERE ci.CartItemID = @cartItemID AND c.AccountID = @accountId
    `;

    const request = new Request(deleteQuery, (err, rowCount) => {
      connection.close();

      if (err) {
        console.error('Lỗi truy vấn:', err);
        return res.status(500).json({ error: 'Lỗi khi xóa item khỏi giỏ hàng' });
      }

      if (rowCount === 0) {
        return res.status(404).json({ error: 'Không tìm thấy sản phẩm trong giỏ hàng của bạn' });
      }

      res.status(200).json({ message: 'Đã xóa sản phẩm khỏi giỏ hàng' });
    });

    request.addParameter('accountId', TYPES.Int, accountId);
    request.addParameter('cartItemID', TYPES.Int, cartItemID);

    connection.execSql(request);
  });

  connection.connect();
}

module.exports = { 
  addCartItemIntoCart, getCartById, removeCartItem
}