const axios = require('axios');
const qs = require('qs');
const { slack } = require('../../config');

async function getUser(userId) {
  try {
    const response = await axios.get(
      `${slack.baseUrl}/users.info?token=${slack.slackToken}&user=${userId}`
    );
    return response.data.user;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getUser,
};
