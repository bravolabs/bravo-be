const axios = require('axios');
const qs = require('qs');
const { slack } = require('../../config');

async function getUser(userId, accessToken) {
  try {
    const response = await axios.get(
      `${slack.baseUrl}/users.info?token=${accessToken}&user=${userId}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

async function getWorkspaceUser(token) {
  try {
    const response = await axios.get(`${slack.baseUrl}/users.list?token=${token}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getUser,
  getWorkspaceUser,
};
