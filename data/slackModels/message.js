const axios = require('axios');
const qs = require('qs');
const { slack } = require('../../config');

async function postMessage(message) {
  try {
    const res = await axios.post(`${slack.baseUrl}/chat.postEphemeral`, qs.stringify(message));
  } catch (err) {
    console.log(err);
  }
}

async function postOpenMessage(message) {
  try {
    await axios.post(`${slack.baseUrl}/chat.postMessage`, qs.stringify(message));
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

async function addReactions(reactions) {
  try {
    await axios.post(`${slack.baseUrl}/reactions.add`, qs.stringify(reactions));
  } catch (err) {
    console.log(err);
  }
}

async function getMessageTimestamp(reqData) {
  try {
    const history = await axios.post(`${slack.baseUrl}/channels.history`, qs.stringify(reqData))
      .then(res => {
        return qs.parse(res);
      });

    const timestamps = history.data.messages.map(msg => {
      if (msg.subtype === 'bot_message') {
        return msg.ts;
      }
    });

    return timestamps[0];
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  postMessage,
  postOpenMessage,
  createDialog,
  addReactions,
  getMessageTimestamp,
};
