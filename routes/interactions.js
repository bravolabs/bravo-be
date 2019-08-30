// if callback is shoiutout and type is whatever then do whatever
const express = require('express');
const { slack } = require('../config');
const shoutOutService = require('../services/slackServices/shoutout');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    await res.status(200).send('');
    const data = JSON.parse(req.body.payload);
    if (data.type === 'interactive_message' && data.callback_id === 'shoutout') {
      const reqInfo = {
        team: data.team.id,
        actions: data.actions,
        triggerId: data.trigger_id,
        message_ts: data.message_ts,
        channel_id: data.channel.id,
        userId: data.user.id,
      };

      await shoutOutService.respondToInteractiveMessage(reqInfo);
    } else if (data.type === 'dialog_submission' && data.callback_id === 'shoutout') {
      const reqInfo = {
        channelId: data.channel.id,
        userId: data.user.id,
        recipient: data.submission.Recipient,
        content: data.submission.ShoutOut,
        team: data.team.id,
      };

      await shoutOutService.submitDialog(reqInfo);
    } else if (data.type === 'dialog_submission' && data.callback_id === 'view-shoutout') {
      const reqInfo = {
        channelId: data.channel.id,
        userId: data.submission.user,
        content: data.submission.ShoutOut,
        team: data.team.id,
        user_id: data.user.id,
      };

      await shoutOutService.getUserShoutOuts(reqInfo);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
