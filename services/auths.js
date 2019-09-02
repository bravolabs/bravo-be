const users = require('../data/dbModels/users');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { secret, slack } = require('../config');

async function loginUser(accessToken, userId) {
  // get user infomation from slack
  const {
    data: { user: slackUser },
  } = await axios.get(`${slack.baseUrl}/users.info?token=${accessToken}&user=${userId}`);

  let user = await users.readBySlackId(userId);
  if (!user || !user.slack_mem_id) {
    return {
      statusCode: 404,
      data: {
        message: 'Workspace not found. Please contact your workspace admin to install Bravo',
      },
    };
  }

  const res = await axios.get(`${slack.baseUrl}/users.info?token=${accessToken}&user=${userId}`);
  if (res.data.user && res.data.user.id && user.slack_mem_id === res.data.user.id) {
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
