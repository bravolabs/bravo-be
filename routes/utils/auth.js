const jwt = require('jsonwebtoken');
const { secret } = require('../../config');

function authenticate(req, res, next) {
  const token = req.headers['authorization'] || 'trapped';

  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err)
        return res.status(401).json({
          message: 'User not authenticated',
        });

      req.user = decoded;

      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, token is required in the Authorization Header',
    });
  }
}

module.exports = {
  authenticate,
};
