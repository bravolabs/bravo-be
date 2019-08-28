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

    // return the details of the user installing app to frontend
    const { user } = await slackModel.user.getUser(reqInfo.userId, reqInfo.accessToken);
    res.status(200).json({
      name: user.profile.real_name,
      avatar: user.profile.image_512,
    });

    // onboard users of the team/organization
    await installService.onBoardUsers(reqInfo.orgId);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;