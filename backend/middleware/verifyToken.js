const jwt = require('jsonwebtoken');
const { isBlacklisted } = require('./blacklist');

const SECRET_KEY = 'KEY';

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Không có token' });
  }

  if (isBlacklisted(token)) {
    return res.status(403).json({ error: 'Token đã bị vô hiệu hóa' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token không hợp lệ' });
    }

    if (!decoded.AccountID) {
      return res.status(400).json({ error: 'Token không chứa AccountID' });
    }

    req.user = decoded;   // { AccountID, email, ... }
    req.token = token;

    console.log("At verifyToken: ", decoded);

    next();
  });
}

module.exports = verifyToken;