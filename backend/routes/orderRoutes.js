const express = require('express');
const checkOrder = require('../middleware/checkOrder');
const verifyToken = require('../middleware/verifyToken');
const orderController = require('../controller/orderController');

const router = express.Router();

router.post('/orderItem',verifyToken, checkOrder, orderController.addOrderItemIntoOrder);
router.get('/history', verifyToken, orderController.getPurchaseHistory);

module.exports = router;