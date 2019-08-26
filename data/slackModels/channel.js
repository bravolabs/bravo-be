const axios = require('axios');
const qs = require('qs');
const { slack } = require('../../config');

async function createChannel(name) {
  try {
    await axios.post(
      `${slack.baseUrl}/channels.create`,
      qs.stringify({
        token: process.env.slack_app_token,
        name,
        validate: true,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

async function findChannel(channel_name, channels) {
  try {
    const channel = channels.filter(singleChannel => singleChannel.name === channel_name);
    return channel;
  } catch (err) {
    console.log(err);
  }
}

async function getAllChannels() {
  try {
    const res = await axios.get(`${slack.baseUrl}/channels.list?token=${slack.slackToken}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllChannels,
  findChannel,
};
