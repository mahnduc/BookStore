const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');
const checkCart = require('../middleware/checkCart');
const { addCartItemIntoCart, getCartById, removeCartItem } = require('../controller/cartController');

router.post('/cartItem', verifyToken, checkCart, addCartItemIntoCart);
router.get('/cart', verifyToken, getCartById);
router.delete('/removecartitem', verifyToken, removeCartItem);

module.exports = router;