const express = require('express');
const { slack, } = require('../config');
const shoutOutService = require('../services/slackServices/shoutout');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    await res.status(200).send('');
    const keyword = req.body.text;
    const { channel_id } = req.body;
    const { user_id } = req.body;

    // the callback here is what differentiates a shoutout
    // message from the feedback interactive message, please don't delete

    if (keyword === 'shoutout') {
      const reqInfo = {
        channel_id: channel_id,
        user_id: user_id,
      };
      await shoutOutService.sendShoutOut(reqInfo);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
