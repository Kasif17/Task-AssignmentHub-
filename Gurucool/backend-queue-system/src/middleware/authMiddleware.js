const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send('Access denied');
  }
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.userId = payload.userId;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

module.exports = authenticate;
