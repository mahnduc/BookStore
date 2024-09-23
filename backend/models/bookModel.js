const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    bookID: String,
    name: String,
    image: String,
    price: String
})
const Book = mongoose.model('book', bookSchema)

module.exports = Book