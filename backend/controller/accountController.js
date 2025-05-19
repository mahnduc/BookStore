// controllers/userController.js
const { Connection, Request, TYPES } = require('tedious');
const { config } = require('../config/db');

async function modifyUser(req, res) {
  const AccountId = req.user.AccountID;

  if (!AccountId) {
    return res.status(400).json({ message: 'Thiếu AccountId từ token' });
  }

  let connection;

  try {
    connection = new Connection(config);

    await new Promise((resolve, reject) => {
      connection.on('connect', (err) => {
        if (err) {
          console.error('Kết nối thất bại:', err);
          reject({ message: 'Lỗi kết nối CSDL', error: err.message });
          return;
        }
        resolve();
      });
      connection.on('error', reject);
      connection.connect();
    });

    // 1. Truy vấn thông tin hiện tại
    const selectSql = `
      SELECT FirstName, LastName, PhoneNumber, DateOfBirth, Gender, Avatar, City, Country
      FROM UserInfo
      WHERE AccountId = @AccountId
    `;

    const currentData = await new Promise((resolve, reject) => {
      const selectRequest = new Request(selectSql, (err) => {
        if (err) {
          console.error('Lỗi truy vấn:', err);
          reject({ message: 'Không thể lấy thông tin hiện tại', error: err.message });
          return;
        }
      });

      selectRequest.addParameter('AccountId', TYPES.Int, AccountId);
      let data = {};
      selectRequest.on('row', (columns) => {
        columns.forEach(col => {
          data[col.metadata.colName] = col.value;
        });
      });
      selectRequest.on('requestCompleted', () => {
        resolve(data);
      });
      connection.execSql(selectRequest);
    });

    if (Object.keys(currentData).length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng', AccountId });
    }

    // 2. Gộp dữ liệu cũ và mới
    const updatedData = {
      FirstName: req.body.FirstName ?? currentData.FirstName,
      LastName: req.body.LastName ?? currentData.LastName,
      PhoneNumber: req.body.PhoneNumber ?? currentData.PhoneNumber,
      DateOfBirth: req.body.DateOfBirth ?? currentData.DateOfBirth,
      Gender: req.body.Gender ?? currentData.Gender,
      Avatar: req.body.Avatar ?? currentData.Avatar,
      City: req.body.City ?? currentData.City,
      Country: req.body.Country ?? currentData.Country,
    };

    // 3. Thực hiện UPDATE
    const updateSql = `
      UPDATE UserInfo
      SET FirstName = @FirstName,
          LastName = @LastName,
          PhoneNumber = @PhoneNumber,
          DateOfBirth = @DateOfBirth,
          Gender = @Gender,
          Avatar = @Avatar,
          City = @City,
          Country = @Country
      WHERE AccountId = @AccountId
    `;

    await new Promise((resolve, reject) => {
      const updateRequest = new Request(updateSql, (err) => {
        if (err) {
          console.error('Lỗi cập nhật:', err);
          reject({ message: 'Lỗi khi cập nhật dữ liệu', error: err.message });
          return;
        }
        resolve();
      });

      updateRequest.addParameter('FirstName', TYPES.NVarChar, updatedData.FirstName);
      updateRequest.addParameter('LastName', TYPES.NVarChar, updatedData.LastName);
      updateRequest.addParameter('PhoneNumber', TYPES.NVarChar, updatedData.PhoneNumber);
      updateRequest.addParameter('DateOfBirth', TYPES.Date, updatedData.DateOfBirth);
      updateRequest.addParameter('Gender', TYPES.NVarChar, updatedData.Gender);
      updateRequest.addParameter('Avatar', TYPES.NVarChar, updatedData.Avatar);
      updateRequest.addParameter('City', TYPES.NVarChar, updatedData.City);
      updateRequest.addParameter('Country', TYPES.NVarChar, updatedData.Country);
      updateRequest.addParameter('AccountId', TYPES.Int, AccountId);

      connection.execSql(updateRequest);
    });

    connection.close();
    res.status(200).json({ message: 'Cập nhật thành công', user: updatedData });

  } catch (error) {
    console.error('Lỗi modifyUser:', error);
    res.status(500).json(error.message ? error : { message: 'Lỗi server khi cập nhật thông tin' });
    if (connection) connection.close();
  }
}

async function getProfile(req, res) {
  const AccountId = req.user.AccountID;

  if (!AccountId) {
    return res.status(400).json({ error: 'Không tìm thấy AccountId trong token' });
  }

  let connection;

  try {
    connection = new Connection(config);

    await new Promise((resolve, reject) => {
      connection.on('connect', (err) => {
        if (err) {
          console.error('Kết nối thất bại:', err);
          reject({ error: 'Kết nối CSDL thất bại' });
          return;
        }
        resolve();
      });
      connection.on('error', reject);
      connection.connect();
    });

    const sql = `
      SELECT FirstName, LastName, PhoneNumber, DateOfBirth, Gender, Avatar, City, Country
      FROM UserInfo
      WHERE AccountID = @AccountId
    `;

    const userInfo = await new Promise((resolve, reject) => {
      const request = new Request(sql, (err) => {
        if (err) {
          console.error('Lỗi truy vấn:', err);
          reject({ error: 'Truy vấn thất bại' });
          return;
        }
      });

      request.addParameter('AccountId', TYPES.Int, AccountId);

      let user = null;
      request.on('row', (columns) => {
        user = {};
        columns.forEach(col => {
          user[col.metadata.colName] = col.value;
        });
      });

      request.on('requestCompleted', () => {
        resolve(user);
      });

      connection.execSql(request);
    });

    connection.close();

    // Trả về -1 nếu không tìm thấy dữ liệu
    if (!userInfo) {
      return res.status(200).json(-1);
    }

    return res.json(userInfo);

  } catch (error) {
    console.error('Lỗi getProfile:', error);
    res.status(500).json(error.error ? error : { error: 'Lỗi server khi lấy thông tin người dùng' });
    if (connection) connection.close();
  }
}


module.exports = {
  modifyUser,
  getProfile,
};