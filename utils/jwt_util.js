// jwt_util.js
const jwt = require('jsonwebtoken');
const secretKey = 'wkwkwkkw'; // Ganti dengan secret key Anda

function createToken(userId) {
  const payload = { id: userId };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
}

module.exports = { createToken, verifyToken };
