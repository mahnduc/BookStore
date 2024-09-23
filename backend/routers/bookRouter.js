const express = require('express')
const Book = require('../models/bookModel.js')
const bookRouter = express.Router()

bookRouter.get('/allbook', async (req, res) => {
    const book = await Book.find()
    res.json(book)
})

bookRouter.post('/addbook', async (req, res) => {
    const name = req.body.name
    const image = req.body.image
    const price = req.body.price

    const book = new Book({
        name: name,
        image: image,
        price: price
    })
    await book.save();
    res.json('Add successed')
})

bookRouter.delete('/deleteone/:id', async (req, res) => {
    await Book.findByIdAndDelete(req.params.id)
    .then(() => {res.json('da xoa')})
    .catch((err) => {res.json(err)})
})

bookRouter.patch('/patch/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const updateBook = await Book.findByIdAndUpdate(_id, req.body, {
            new : true
        });
        res.send(updateBook)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = bookRouter