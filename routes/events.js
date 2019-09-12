const express = require('express');
const installService = require('../services/slackServices/install');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    if (req.body.type === 'url_verification') {
      res.status(200).send(req.body.challenge);
    } else if (req.body.event.type === 'member_joined_channel') {
      res.status(200).send('');
      const { user, team } = req.body.event;
      await installService.onboardNewUser(user, team);
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
