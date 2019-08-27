const users = require('../data/dbModels/users');
const organizations = require('../data/dbModels/organizations');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { secret, slack } = require('../config');

async function loginUser(accessToken, userId) {
  let user = await users.readBySlackId(userId);

  const res = await axios.get(`${slack.baseUrl}/users.info?token=${accessToken}&user=${userId}`);
  if (res.user && res.user.id) {
    if (!user || !user.slack_mem_id || user.slack_mem_id !== res.user.id) {
      const organization = await organizations.create({
        slack_org_id: res.user.team_id,
        name: '...',
      });

      user = await users.create({
        org_id: organization.id,
        slack_mem_id: res.user.id,
        name: res.user.name,
        email: res.user.profile.email,
      });
      user = user[0];
    }
    const token = jwt.sign(user, secret, { expiresIn: '1d' });

    return {
      statusCode: 200,
      data: {
        ...user,
        token,
      },
    };
  }

  return {
    statusCode: 401,
    data: {
      message: 'Authentication failed.',
    },
  };
}

module.exports = {
  loginUser,
};
