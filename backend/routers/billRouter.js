const express = require('express')
const Bill = require('../models/bill.js')
const billRouter = express.Router()

billRouter.get('/getbill', async (req, res) => {
    const bill = await Bill.find()
    res.json(bill)
})
billRouter.post('/post', async (req, res) => {
    const name = req.body.name
    const image = req.body.image
    const price = req.body.price
    const newItem = new Bill({
        name: name,
        image: image,
        price: price,
    })
    newItem.save();
    res.json(newItem)
})
billRouter.delete('/delete', async (req, res) => {
    await Bill.deleteMany({})
    res.json('xoa thanh cong')
})

module.exports = billRouter