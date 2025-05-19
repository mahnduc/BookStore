

// dbConfig.js
const { Connection } = require('tedious');

const config = {
  server: "localhost\\SQLEXPRESS",
  authentication: {
    type: 'default',
    options: {
      userName: "bookstore",
      password: "123456",
    },
  },
  options: {
    database: "BookStore",
    encrypt: false,
    trustServerCertificate: true,
  },
};

// Hàm kiểm tra kết nối
function testConnection() {
  const connection = new Connection(config);

  connection.on('connect', (err) => {
    if (err) {
      console.error('❌ Kết nối thất bại:', err.message);
    } else {
      console.log('✅ Kết nối thành công tới SQL Server');
    }
    connection.close();
  });

  connection.connect();
}

module.exports = { config, testConnection };