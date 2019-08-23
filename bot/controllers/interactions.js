const express = require('express');
const axios = require('axios');
const qs = require('qs');
const router = express.Router();
const data = require('../database/default-content');
const slack = require('../database/slack');

const interactions = async (req, res) => {
  const {
    type,
    token,
    user,
    actions,
    callback_id,
    trigger_id,
    channel,
    submission,
    response_url,
  } = JSON.parse(req.body.payload);

  if (type === 'interactive_message') {
    if (actions[0].value === 'give') {
      const dialog = data.dialog(trigger_id);
      await slack.dialog(dialog);
    } else if (actions[0].value === 'retrieve') {
      res.send('retrieve');
    }
  } else if (type === 'dialog_submission') {
    res.send('');
    const message = data.formSubmissionMessage(
      channel.id,
      submission.Recipient,
      submission.ShoutOut,
      user.id
    );
    const channelAlert = data.channelAlertMessage(
      user.id,
      submission.Recipient,
      submission.ShoutOut
    );
    await slack.postMessage(message);
    await slack.postChannel(channelAlert);
  }
};

module.exports = {
  interactions,
};
