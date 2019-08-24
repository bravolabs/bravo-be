const express = require('express');
const axios = require('axios');
const qs = require('qs');
const router = express.Router();
const data = require('../database/default-content');
const slack = require('../database/slack');

const commands = async (req, res) => {
  await res.status(200).send('');
  const keyword = req.body.text;
  const { channel_id } = req.body;
  const { user_id } = req.body;
  // slack gives 3seconds to respond to a command, before it thinks you failed, and so we are getting operation_timed out error
  if (keyword === 'shoutout') {
    const message = await data.shoutIntro(channel_id, user_id);
    await slack.postMessage(message);
    const channels = await slack.getAllChannels();
    const channel = await slack.findChannel(process.env.DESIGNATED_CHANNEL, channels.channels);

    // Creating the channel bravo would talk to
    if (channel.length !== 0) {
      console.log('channel exists');
    } else {
      await slack.createChannel(process.env.DESIGNATED_CHANNEL);
    }
  } else if (keyword === 'feedback') {
    // console.log('feedback');
    const res = await axios.get(
      `https://slack.com/api/users.list?token=${process.env.slack_app_token}&team=TMK9G16SU`
    );
    console.log(res.data);
  } else if (keyword === 'help') {
    res.send('help');
  } else {
    console.log('bad');
  }
};

module.exports = {
  commands,
};
