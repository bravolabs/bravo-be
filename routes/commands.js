const express = require('express');
const { slack } = require('../config');
const shoutOutService = require('../services/slackServices/shoutout');
const installService = require('../services/slackServices/install');
const walletService = require('../services/slackServices/wallet');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const keyword = req.body.text;

    const { channel_id, user_id, team_id } = req.body;
    switch (keyword) {
      case 'shoutout':
        await res.status(200).send('');
        const reqInfo = {
          channel_id,
          user_id,
          team_id,
        };

        await shoutOutService.sendShoutOut(reqInfo);
        break;
      case 'wallet':
        await res.status(200).send('');
        const walletReqinfo = {
          channel_id,
          user_id,
          team_id,
        };
        await walletService.getUserWalletBalance(walletReqinfo);
        break;
      case 'help':
        await res.status(200).send('');
        const helpreqInfo = {
          channel_id,
          user_id,
          team_id,
        };

        await installService.sendUserHelpMessage(helpreqInfo);
        break;
      case '':
        await res.status(200).send('');
        const emptyreqInfo = {
          channel_id,
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
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
