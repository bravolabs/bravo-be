const axios = require('axios');
const qs = require('qs');
const { slack } = require('../../config');

exports.slackModel = {
  async postMessage(message) {
    try {
      await axios.post(`${slack.baseUrl}/chat.postEphemeral`, qs.stringify(message));
    } catch (err) {
      console.log(err);
    }
  },

  async createChannel(name) {
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
  },

  async findChannel(channel_name, channels) {
    try {
      const channel = channels.filter(singleChannel => singleChannel.name === channel_name);
      return channel;
    } catch (err) {
      console.log(err);
    }
  },

  async getAllChannels() {
    try {
      const res = await axios.get(
        `${slack.baseUrl}/channels.list?token=${process.env.slack_app_token}`
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },

  async postToChannel(message) {
    try {
      await axios.post(`${slack.baseUrl}/dialog.open`, qs.stringify(dialog));
    } catch (err) {
      console.log(err);
    }
  },

  async dialog(dialog) {
    try {
      await axios.post(`${slack.baseUrl}/dialog.open`, qs.stringify(dialog));
    } catch (err) {
      console.log(err);
    }
  },

  async getUser(userId) {
    try {
      const response = await axios.get(
        `${slack.baseUrl}/users.info?token=${slack.slackToken}&user=${userId}`
      );
      return response.data.user;
    } catch (err) {
      console.log(err);
    }
  },
};
