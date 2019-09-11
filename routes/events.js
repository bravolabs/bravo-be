const express = require('express');
const { slack } = require('../config');
const shoutOutService = require('../services/slackServices/shoutout');
const installService = require('../services/slackServices/install');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    res.status(200).send('');
    const { user, team } = req.body.event;
    await installService.onboardNewUser(user, team);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
