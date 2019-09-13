const express = require('express');
const installService = require('../services/slackServices/install');
const transaction = require('../services/wallet');
const User = require('../data/dbModels/users');
const Organization = require('../data/dbModels/organizations');
const Shoutout = require('../data/dbModels/shoutouts');

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
      const reactingUser = await User.readBySlackId(req.body.event.user);
      const organization = await Organization.read(req.body.team_id);
      const shoutout = await Shoutout.readByTimestamp(req.body.event.item.ts);
      const result = await transaction.ProcessTransaction(
        reactingUser.id,
        shoutout.giver_id,
        organization.id,
        shoutout.id,
        'reaction'
      );
      console.log(result);
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
