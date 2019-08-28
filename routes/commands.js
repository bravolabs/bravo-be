const express = require('express');
const { slack } = require('../config');
const shoutOutService = require('../services/slackServices/shoutout');
const installService = require('../services/slackServices/install');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const keyword = req.body.text;

    const { channel_id } = req.body;
    const { user_id } = req.body;
    const { team_id } = req.body;

    // the callback here is what differentiates a shoutout
    // message from the feedback interactive message, please don't delete

    if (keyword === 'shoutout') {
      await res.status(200).send('');
      const reqInfo = {
        channel_id: channel_id,
        user_id: user_id,
        team_id,
      };

      await shoutOutService.sendShoutOut(reqInfo);
    } else if (keyword === '' || keyword === 'help') {
      await res.status(200).send('');
      const reqInfo = {
        user_id: user_id,
        team_id,
      };
      await installService.sendUserOnboardingMessage(reqInfo);
    } else {
      await res
        .status(200)
        .send('Type `/bravo help` for onboarding  or `/bravo shoutout` to get started');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
