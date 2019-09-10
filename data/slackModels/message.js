const axios = require('axios');
const qs = require('qs');
const { slack } = require('../../config');

async function postMessage(message) {
  try {
    const res = await axios.post(`${slack.baseUrl}/chat.postEphemeral`, qs.stringify(message));
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

async function postOpenMessage(message) {
  try {
    const res = await axios.post(`${slack.baseUrl}/chat.postMessage`, qs.stringify(message));
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

async function createDialog(dialog) {
  try {
    await axios.post(`${slack.baseUrl}/dialog.open`, qs.stringify(dialog));
  } catch (err) {
    console.log(err);
  }
}

async function getThread(query) {
  try {
    const res = await axios.get(
      `${slack.baseUrl}/conversations.replies?token=${query.token}&&channel=${query.channel}&&ts=${query.ts}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  postMessage,
  postOpenMessage,
  createDialog,
  getThread,
};
