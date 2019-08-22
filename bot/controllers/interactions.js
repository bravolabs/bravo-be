const express = require('express');
const axios = require('axios');
const qs = require('qs');
const router = express.Router();
const data = require('../database/default-content');
const slack = require('../database/slack');

const interactions = async (req, res) => {
  const { type, token, user, actions, callback_id, trigger_id, channel, submission } = JSON.parse(
    req.body.payload
  );
  if (type === 'interactive_message') {
    if (actions[0].value === 'give') {
      const dialog = data.dialog(trigger_id);
      slack.dialog(dialog);
    } else if (actions[0].value === 'retrieve') {
      res.send('retrieve');
    }
  } else if (type === 'dialog_submission') {
    res.send('');
    const message = data.formSubmissionMessage(channel.id, submission.Recipient);
    slack.postMessage(message);
  }
};

module.exports = {
  interactions,
};
