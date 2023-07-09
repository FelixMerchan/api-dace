// authMiddleware.js
const jwt = require('jsonwebtoken');
const { secretKey } = require('../src/config');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }
}

module.exports = authMiddleware;
