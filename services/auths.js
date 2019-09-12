const jwt = require('jsonwebtoken');
const { secret } = require('../config');

async function loginUser(user) {
  const token = jwt.sign(user, secret, { expiresIn: '30d' });
  return {
    statusCode: 200,
    data: {
      id: user.id,
      org_id: user.org_id,
      name: user.name,
      avatar: user.avatar,
      token,
    },
  };
}

module.exports = {
  loginUser,
};
