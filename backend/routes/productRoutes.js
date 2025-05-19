// books.js
const express = require('express');
const router = express.Router();
const { getBooks, searchBook, getTypeBook, getBooksByTypeBookIds } = require('../controller/productController');

router.get('/books', getBooks);

router.get('/search', searchBook);

router.get('/typebook', getTypeBook);

router.post('/getBooksByTypeBookIds', getBooksByTypeBookIds);

module.exports = router;