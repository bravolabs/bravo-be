const express = require('express');
const router = express.Router();
const axios = require('axios');
const { slack } = require('../config');
const { slackModel } = require('../data/slackModels/slack');

const installService = require('../services/slackServices/install');

router.get('/', async (req, res) => {
  const code = req.query.code;
  // console.log(code);
  const response = await axios.get(
    `https://slack.com/api/oauth.access?client_id=${slack.clientId}&client_secret=${slack.clientSecret}&code=${code}&redirect_uri=https://266f5e9a.ngrok.io/slack/install`
  );
  // console.log(response.data);
  const token = response.data.access_token;
  const team_id = response.data.team_id;

  await slackModel.channel.createChannel('johnson', token);
  const users = await slackModel.user.getWorkspaceUser(token);
  const reqData = {
    userId: response.data.user_id,
    orgId: response.data.team_id,
    orgName: response.data.team_name,
    channelName: response.data.incoming_webhook.channel,
    channelId: response.data.incoming_webhook.channel_id,
    accessToken: response.data.access_token,
  };
  await axios.post(`https://266f5e9a.ngrok.io/slack/install`, reqData);
  // console.log(users);
  // team_name, team_id, access_token, user_id, incoming_webhook => channel,channel_id
});

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

    // please do not delete the code below, though small it's as important as the entire codebase
    // await installService.onBoardUsers(reqInfo.orgId);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
