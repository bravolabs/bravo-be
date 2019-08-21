const axios = require('axios');
const qs = require('qs');
const { apiUrl } = require('../utils/url');

const postMessage = async message => {
  await axios.post(`${apiUrl}/chat.postMessage`, qs.stringify(message));
};

const dialog = async dialog => {
  await axios.post(`${apiUrl}/dialog.open`, qs.stringify(dialog));
};

module.exports = {
  postMessage,
  dialog,
};
