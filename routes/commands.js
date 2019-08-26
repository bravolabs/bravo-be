const express = require('express');
const { slack } = require('../config');
const shoutOutService = require('../services/slackServices/shoutout');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    await res.status(200).send('');
    const keyword = req.body.text;
    const { channel_id } = req.body;
    const { user_id } = req.body;

    if (keyword === 'shoutout') {
      const message = {
        channel: channel_id,
        user: user_id,
        token: slack.slackToken,
        attachments: JSON.stringify([
          {
            fallback: 'Please try againg',
            callback_id: 'shoutout_key',
            attachment_type: 'default',
            title: 'Shoutout Options',
            text: 'kindly select an option for your bot task',
            color: '#7ed692',
            divider: true,
            actions: [
              {
                name: 'Give Shoutout',
                text: 'Give Shoutout',
                type: 'button',
                value: 'give',
                style: 'default',
              },
            ],
          },
        ]),
      };
      await shoutOutService.sendShoutOut(message);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;