const express = require('express');
const installService = require('../services/slackServices/install');
const transactionService = require('../services/slackServices/transaction');
const router = express.Router();
const User = require('../data/dbModels/users');

router.post('/', async (req, res) => {
  const isNotBot = (await User.readBySlackId(req.body.event.user)) || false;
  try {
    if (req.body.type === 'url_verification') {
      res.status(200).send(req.body.challenge);
    } else if (req.body.event.type === 'member_joined_channel') {
      res.status(200).send('');
      const { user, team } = req.body.event;

      await installService.onboardNewUser(user, team);
    } else if (req.body.event.type === 'reaction_added' && isNotBot) {
      res.status(200).send('');
      const reqInfo = {
        user: req.body.event.user,
        org_id: req.body.team_id,
        ts: req.body.event.item.ts,
        action: 'reaction',
        fund: true,
      };

      await transactionService.givePoint(reqInfo);
    } else if (req.body.event.type === 'reaction_removed' && isNotBot) {
      res.status(200).send('');
      const reqInfo = {
        user: req.body.event.user,
        org_id: req.body.team_id,
        ts: req.body.event.item.ts,
        action: 'reaction',
        fund: false,
      };

      await transactionService.givePoint(reqInfo);
    } else if (
      req.body.event.type === 'message' &&
      req.body.event.thread_ts &&
      !req.body.event.parent_user_id
    ) {
      res.status(200).send('');
      const reqInfo = {
        user: req.body.event.user,
        org_id: req.body.event.team,
        ts: req.body.event.thread_ts,
        action: 'comment',
        fund: true,
      };
      await transactionService.givePoint(reqInfo);
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
