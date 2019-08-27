const express = require('express');
const router = express.Router();
const axios = require('axios');
const { slack } = require('../config');
const { slackModel } = require('../data/slackModels/slack');

const installService = require('../services/slackServices/install');

router.post('/', async (req, res) => {
  try {
    const reqInfo = req.body;
    await installService.completeInstall(reqInfo);

    const { user } = await slackModel.user.getUser(reqInfo.userId, reqInfo.accessToken);
    res.status(200).json({
      name: user.profile.real_name,
      avatar: user.profile.image_512,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
