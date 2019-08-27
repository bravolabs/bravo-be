const { slackModel } = require('../../data/slackModels/slack');
const dbModel = require('../../data/dbModels/organizations');
const { slack } = require('../../config');
const events = require('events');
const eventEmitter = new events.EventEmitter();

exports.onBoardUsers = () => {};

exports.completeInstall = installData => {
  const organizationDetails = {
    slack_org_id: installData.orgId,
    name: installData.orgName,
    channel_name: installData.channelName,
    channel_id: installData.channelId,
    access_token: installData.accessToken,
  };
  dbModel.create(organizationDetails);
};
