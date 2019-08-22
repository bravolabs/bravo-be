const express = require('express');
const axios = require('axios');
const qs = require('qs');
const router = express.Router();
const data = require('../database/default-content');
const slack = require('../database/slack');

const commands = async (req, res) => {
  const keyword = req.body.text;
  const { channel_id } = req.body;
  // slack gives 3seconds to respond to a command, before it thinks you failed, and so we are getting operation_timed out error
  if (keyword === 'shoutout') {
    res.status(200).send('');
    const message = data.shoutIntro(channel_id);
    await slack.postMessage(message);
  } else if (keyword === 'feedback') {
    res.send('feedback');
  } else if (keyword === 'help') {
    res.send('help');
  } else {
    console.log('bad');
  }
};

module.exports = {
  commands,
};
