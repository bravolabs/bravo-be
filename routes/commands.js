const express = require('express');
const { slack } = require('../config');
const shoutOutService = require('../services/slackServices/shoutout');
const installService = require('../services/slackServices/install');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const keyword = req.body.text;

    const { channel_id, user_id, team_id } = req.body;
    await res.status(200).send('');
    switch (keyword) {
      case 'shoutout':
        const reqInfo = {
          channel_id: channel_id,
          user_id: user_id,
          team_id,
        };

        await shoutOutService.sendShoutOut(reqInfo);
        break;
      case 'help':
        const helpreqInfo = {
          channel_id: channel_id,
          user_id,
          team_id,
        };

        await installService.sendUserHelpMessage(helpreqInfo);
        break;
      case '':
        const emptyreqInfo = {
          channel_id: channel_id,
          user_id,
          team_id,
        };

        await installService.sendUserOnboardingMessage(emptyreqInfo);
        break;
      default:
        await res
          .status(200)
          .send('Type `/bravo help` for onboarding  or `/bravo shoutout` to get started');
    }
    if (keyword === 'shoutout') {
    } else if (keyword === 'help') {
    } else if (keyword === '') {
    } else {
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
