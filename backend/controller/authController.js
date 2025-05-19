const { Connection, Request, TYPES } = require('tedious');
const jwt = require('jsonwebtoken');
const { config } = require('../config/db');

const SECRET_KEY = 'KEY';

// Hàm đăng ký
async function registerUser(req, res) {
  const { email, password, firstName, lastName, phoneNumber } = req.body;

  const connection = new Connection(config);

  try {
    const result = await new Promise((resolve, reject) => {
      connection.on('connect', (err) => {
        if (err) {
          reject(err);
          return;
        }

        const sql = `
          IF EXISTS (SELECT 1 FROM Account WHERE Email = @Email)
          BEGIN
            RAISERROR(N'Email đã tồn tại', 16, 1);
            RETURN;
          END

          INSERT INTO Account (Email, Password)
          VALUES (@Email, @Password);

          INSERT INTO UserInfo (AccountID, FirstName, LastName, PhoneNumber)
          VALUES (SCOPE_IDENTITY(), @FirstName, @LastName, @PhoneNumber);
        `;

        const request = new Request(sql, (err, rowCount) => {
          connection.close();
          if (err) {
            reject(err);
            return;
          }

          resolve({
            message: 'Đăng ký thành công'
          });
        });

        // Thêm tham số
        request.addParameter('Email', TYPES.NVarChar, email);
        request.addParameter('Password', TYPES.NVarChar, password);
        request.addParameter('FirstName', TYPES.NVarChar, firstName);
        request.addParameter('LastName', TYPES.NVarChar, lastName);
        request.addParameter('PhoneNumber', TYPES.NVarChar, phoneNumber);

        connection.execSql(request);
      });

      connection.on('error', (err) => {
        connection.close();
        reject(err);
      });

      connection.connect();
    });

    res.status(201).json(result);

  } catch (error) {
    console.error('Lỗi đăng ký:', error);
    res.status(500).json({ error: error.message || 'Lỗi đăng ký người dùng' });
  }
}

// Hàm đăng nhập
async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const connection = new Connection(config);

    await new Promise((resolve, reject) => {
      connection.on('connect', (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });

      connection.on('error', (err) => {
        reject(err);
      });

      connection.connect();
    });

    const sql = `SELECT * FROM Account WHERE Email = @Email AND Password = @Password`;
    let user = null;
    let token = null;

    await new Promise((resolve, reject) => {
      const request = new Request(sql, (err) => {
        connection.close();
        if (err) {
          reject(err);
          return;
        }
        if (!user) {
          return res.status(401).json({ error: 'Sai tài khoản hoặc mật khẩu' });
        }
        resolve({ user, token });
      });

      request.addParameter('Email', TYPES.NVarChar, email);
      request.addParameter('Password', TYPES.NVarChar, password);

      request.on('row', (columns) => {
        user = {};
        columns.forEach(col => {
          user[col.metadata.colName] = col.value;
        });

        token = jwt.sign(
          { AccountID: user.AccountID },
          SECRET_KEY,
        );
      });

      connection.execSql(request);
    });

    return res.json({
      message: 'Đăng nhập thành công',
      user: user,
      token: token,
    });

  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    return res.status(500).json({ error: 'Lỗi đăng nhập' });
  }
}

module.exports = { registerUser, loginUser };