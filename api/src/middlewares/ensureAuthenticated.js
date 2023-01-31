const { verify } = require('jsonwebtoken');
const auth = require('../configs/auth');
const AppError = require('../utils/AppError');

function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return next(new AppError('JWT token is missing', 401));

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, auth.jwt.secret);

    req.user = {
      id: Number(user_id),
    }

    return next();
  } catch (error) {
    return next(error);
  }
}

module.exports = ensureAuthenticated;