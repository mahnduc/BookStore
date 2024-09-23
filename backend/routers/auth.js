const express = require('express')
const Account = require('../models/account.js')
const jwt = require('jsonwebtoken')
const auth = express.Router()

auth.get('/', async (req, res) => {
    const account = await Account.find()
    res.json(account)
})
auth.get('/:id', async(req, res) => {
    const account = await Account.findById(req.params.id)
    res.json(account)
})
auth.post('/register', async (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const account = await Account.findOne({
        email: email,
    })
    if (account) {
        res.json('tai khoan da ton tai')
    } else {
        const newAccount = new Account({
            username: username,
            email: email,
            password: password
        })
        newAccount.save()
        .then(() => {
            res.json('tao tai khoan thanh cong')
        })
        .catch((err) => {
            res.json(err)
        })
    }
})
auth.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    if (email == 'admin@admin.com' && password == 'admin'){
        res.json('admin')
        return true
    }
    const validateAccount = await Account.findOne({
        email: email,
        password: password
    })
    
    if (validateAccount) {
        const accessToken = jwt.sign({
            id: Account._id
        }, "manhduc")
        //res.json("Success")
        //console.log({validateAccount, accessToken})
        res.json({validateAccount ,accessToken})
    } else {
        res.json('email hoac password khong dung')
    }
    
})
auth.get('/datauser/:id', async (req, res) => {
    try {
        const account = await Account.findById({_id:req.params.id})
        res.json(account)
    } catch (err) {
        res.json(err)
    }
    
})
auth.patch('/bought/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const updateBought = await Account.findByIdAndUpdate(_id, req.body, {
            new : true
        })
        res.send(updateBought)
    } catch (e) {
        res.status(400).send(e)
    }
})
module.exports = auth;