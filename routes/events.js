const express = require('express');
const installService = require('../services/slackServices/install');
const transactionService = require('../services/slackServices/transaction');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    if (req.body.type === 'url_verification') {
      res.status(200).send(req.body.challenge);
    } else if (req.body.event.type === 'member_joined_channel') {
      res.status(200).send('');
      const { user, team } = req.body.event;
      await installService.onboardNewUser(user, team);
    } else if (req.body.event.type === 'reaction_added' && !req.body.event.item_user) {
      res.status(200).send('');
      const reqInfo = {
        user: req.body.event.user,
        org_id: req.body.team_id,
        ts: req.body.event.item.ts,
      };
      await transactionService.giveReactionPoint(reqInfo);
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
