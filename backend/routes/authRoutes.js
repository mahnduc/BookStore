const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controller/authController'); // Đường dẫn tới authController.js
const { addToBlacklist } = require('../middleware/blacklist');
const verifyToken = require('../middleware/verifyToken')

router.post('/register', registerUser);
  
router.post('/login', loginUser);

  // LOGOUT
router.post('/logout', verifyToken, (req, res) => {
  const token = req.token;
  addToBlacklist(token);
  res.json({ message: 'Đăng xuất thành công' });
});
  
module.exports = router;
