const axios = require('axios');
const qs = require('qs');
const { apiUrl } = require('../utils/url');

const postMessage = async message => {
  try {
    await axios.post(`${apiUrl}/chat.postEphemeral`, qs.stringify(message));
  } catch (err) {
    console.log(err);
  }
};

const postChannel = async message => {
  await axios.post(`${apiUrl}/chat.postMessage`, qs.stringify(message));
};

const dialog = async dialog => {
  await axios.post(`${apiUrl}/dialog.open`, qs.stringify(dialog));
};

const getUser = async user_id => {
  const response = await axios.get(
    `${apiUrl}/users.info?token=${process.env.slack_app_token}&user=${user_id}`
  );
  return response.data.user;
};

module.exports = {
  postMessage,
  postChannel,
  dialog,
  getUser,
};
