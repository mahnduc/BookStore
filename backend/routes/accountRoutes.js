const express = require('express');
const { Connection, Request, TYPES } = require('tedious');
const { config } = require('../config/db');
const verifyToken = require('../middleware/verifyToken');
const { modifyUser, getProfile } = require('../controller/accountController');

const router = express.Router();

router.get('/profile', verifyToken, getProfile);

// Route PUT /api/user/modify
router.put('/modify', verifyToken, modifyUser);

module.exports = router;