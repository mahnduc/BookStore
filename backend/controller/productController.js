const { Connection, Request, TYPES } = require('tedious');
const { config } = require('../config/db');

async function getBooks(req, res) {
  let connection;

  try {
    connection = new Connection(config);

    await new Promise((resolve, reject) => {
      connection.on('connect', (err) => {
        if (err) {
          console.error('Connection Failed', err);
          reject('Connection failed');
          return;
        }
        resolve();
      });
      connection.on('error', reject);
      connection.connect();
    });

    const results = await new Promise((resolve, reject) => {
      const books = [];

      const sql = `
        SELECT TOP 20
          b.BookId,
          b.Title,
          b.Description,
          b.Price,
          b.Stock,
          tb.TypeBookName AS book_type,
          p.PublisherName AS name_publisher,
          a.AuthorName AS name_author
        FROM Book b
        JOIN TypeBook tb ON b.TypeBookId = tb.TypeBookId
        JOIN Publisher p ON b.PublisherId = p.PublisherId
        JOIN Author a ON b.AuthorId = a.AuthorId
      `;

      const request = new Request(sql, (err) => {
        if (err) {
          console.error('Request Failed', err);
          reject('Query failed');
          return;
        }
        resolve(books);
      });

      request.on('row', (columns) => {
        const row = {};
        columns.forEach((column) => {
          row[column.metadata.colName] = column.value;
        });
        books.push(row);
      });

      connection.execSql(request);
    });

    connection.close();
    res.json(results);

  } catch (error) {
    console.error('Lỗi getBooks:', error);
    res.status(500).send(error);
    if (connection) {
      connection.close();
    }
  }
}


const searchBook = async (req, res) => {
  const rawKeyword = req.query.q;
  let connection;

  if (!rawKeyword) {
    return res.status(400).json({ message: 'Từ khóa tìm kiếm là bắt buộc.' });
  }

  // Chuẩn bị từ khóa cho truy vấn CONTAINS: thêm dấu nháy kép và ký tự đại diện nếu cần
  const formattedKeyword = `"*${rawKeyword.replace(/"/g, '""')}*"`; // Escaping dấu nháy kép

  try {
    connection = new Connection(config);

    await new Promise((resolve, reject) => {
      connection.on('connect', (err) => {
        if (err) {
          console.error('Kết nối thất bại', err);
          reject({ message: 'Kết nối thất bại.', error: err });
          return;
        }
        resolve();
      });

      connection.on('error', (err) => {
        console.error('Lỗi kết nối', err);
        reject({ message: 'Lỗi kết nối.', error: err });
      });

      connection.connect();
    });

    const sql = `
      SELECT 
        b.BookID, b.Title, b.Description, b.Price, b.Stock,
        a.AuthorName, p.PublisherName, t.TypeBookName
      FROM Book b
      LEFT JOIN Author a ON b.AuthorID = a.AuthorID
      LEFT JOIN Publisher p ON b.PublisherID = p.PublisherID
      LEFT JOIN TypeBook t ON b.TypeBookID = t.TypeBookID
      WHERE CONTAINS((b.Title, b.Description), @keyword)
    `;

    const results = await new Promise((resolve, reject) => {
      const books = [];
      const request = new Request(sql, (err) => {
        if (err) {
          console.error('Lỗi truy vấn:', err);
          reject({ message: 'Lỗi truy vấn.', error: err });
          return;
        }
        resolve(books);
      });

      request.addParameter('keyword', TYPES.NVarChar, formattedKeyword);

      request.on('row', (columns) => {
        const book = {};
        columns.forEach(col => {
          book[col.metadata.colName] = col.value;
        });
        books.push(book);
      });

      connection.execSql(request);
    });

    res.status(200).json(results);

  } catch (error) {
    console.error('Lỗi trong searchBook:', error);
    res.status(500).json(error);
  } finally {
    if (connection && connection.connected) {
      connection.close();
    }
  }
}

async function getTypeBook(req, res) {
  let connection;

  try {
    connection = new Connection(config);

    await new Promise((resolve, reject) => {
      connection.on('connect', (err) => {
        if (err) {
          console.error('Kết nối thất bại:', err);
          reject('Kết nối thất bại');
          return;
        }
        resolve();
      });
      connection.on('error', reject);
      connection.connect();
    });

    const results = await new Promise((resolve, reject) => {
      const typeBooks = [];
      const sql = `SELECT TypeBookID, TypeBookName FROM TypeBook`;

      const request = new Request(sql, (err) => {
        if (err) {
          console.error('Lỗi truy vấn:', err);
          reject('Lỗi truy vấn');
          return;
        }
        resolve(typeBooks);
      });

      request.on('row', (columns) => {
        const row = {};
        columns.forEach((column) => {
          row[column.metadata.colName] = column.value;
        });
        typeBooks.push(row);
      });

      connection.execSql(request);
    });

    res.status(200).json(results);
  } catch (error) {
    console.error('Lỗi getTypeBook:', error);
    res.status(500).send(error);
  } finally {
    if (connection && connection.connected) {
      connection.close();
    }
  }
}

async function getBooksByTypeBookIds(req, res) {
  const typeBookIds = req.body.typeBookIds;

  if (!Array.isArray(typeBookIds) || typeBookIds.length === 0) {
    return res.status(400).json({ error: 'Danh sách TypeBookID không hợp lệ.' });
  }

  let connection;

  try {
    connection = new Connection(config);

    await new Promise((resolve, reject) => {
      connection.on('connect', (err) => {
        if (err) {
          console.error('Kết nối thất bại', err);
          reject('Kết nối thất bại');
          return;
        }
        resolve();
      });
      connection.on('error', reject);
      connection.connect();
    });

    const paramPlaceholders = typeBookIds.map((_, i) => `@id${i}`).join(', ');
    const sql = `
      SELECT 
        b.BookID, b.Title, b.Description, b.Price, b.Stock,
        a.AuthorName, p.PublisherName, t.TypeBookName
      FROM Book b
      LEFT JOIN Author a ON b.AuthorID = a.AuthorID
      LEFT JOIN Publisher p ON b.PublisherID = p.PublisherID
      LEFT JOIN TypeBook t ON b.TypeBookID = t.TypeBookID
      WHERE b.TypeBookID IN (${paramPlaceholders})
    `;

    const results = await new Promise((resolve, reject) => {
      const books = [];
      const request = new Request(sql, (err) => {
        if (err) {
          console.error('Lỗi truy vấn:', err);
          reject('Lỗi truy vấn');
          return;
        }
        resolve(books);
      });

      // Thêm tham số động
      typeBookIds.forEach((id, i) => {
        request.addParameter(`id${i}`, TYPES.Int, id);
      });

      request.on('row', (columns) => {
        const book = {};
        columns.forEach((col) => {
          book[col.metadata.colName] = col.value;
        });
        books.push(book);
      });

      connection.execSql(request);
    });

    res.status(200).json(results);
  } catch (error) {
    console.error('Lỗi getBooksByTypeBookIds:', error);
    res.status(500).json({ error: 'Lỗi máy chủ.' });
  } finally {
    if (connection && connection.connected) {
      connection.close();
    }
  }
}

module.exports = {
  getBooks, searchBook, getTypeBook, getBooksByTypeBookIds
};