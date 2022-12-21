const jwt = require('jsonwebtoken');
const ErrorNotAuth = require('../errors/ErrorNotAuth');

const { JWT_SECRET = 'your-secret-key' } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new ErrorNotAuth('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new ErrorNotAuth('Необходима авторизация');
  }

  req.user = payload;
  next();
};

module.exports = auth;
