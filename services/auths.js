const users = require('../data/dbModels/users');
const organizations = require('../data/dbModels/organizations');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { secret, slack } = require('../config');

async function loginUser(accessToken, userId) {
  let user = await users.readBySlackId(userId);

  const res = await axios.get(`${slack.baseUrl}/users.info?token=${accessToken}&user=${userId}`);
  if (res.data.user && res.data.user.id) {
    if (!user || !user.slack_mem_id || user.slack_mem_id !== res.data.user.id) {
      const organization = await organizations.create({
        slack_org_id: res.data.user.team_id,
        name: '...',
      });

      user = await users.create({
        org_id: organization.id,
        slack_mem_id: res.data.user.id,
        name: res.data.user.name,
        email: res.data.user.profile.email,
      });
      user = user[0];
    }
    const token = jwt.sign(user, secret, { expiresIn: '30d' });

    return {
      statusCode: 200,
      data: {
        name: res.data.user.real_name,
        avatar: res.data.user.profile.image_72,
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
