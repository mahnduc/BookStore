const mongoose = require('mongoose')
const Book = require('./bookModel.js')
const billSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: String
},
{
    timestamps:true
})
const Bill = mongoose.model('bill', billSchema)

module.exports = Bill;