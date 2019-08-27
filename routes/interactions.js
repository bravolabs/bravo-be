// if callback is shoiutout and type is whatever then do whatever
const express = require('express');
const { slack, } = require('../config');
const shoutOutService = require('../services/slackServices/shoutout');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    await res.status(200).send('');
    const data = JSON.parse(req.body.payload);
    // console.log(data);
    if (data.type === 'interactive_message' && data.callback_id === 'shoutout') {
      const reqInfo = {
        actions: data.actions,
        triggerId: data.trigger_id,
      };

      await shoutOutService.respondToInteractiveMessage(reqInfo);
    } else if (data.type === 'dialog_submission' && data.callback_id === 'shoutout') {
      const reqInfo = {
        channelId: data.channel.id,
        userId: data.user.id,
        recipient: data.submission.Recipient,
        content: data.submission.ShoutOut,
      };

      await shoutOutService.submitDialog(reqInfo);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
