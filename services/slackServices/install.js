const { slackModel } = require('../../data/slackModels/slack');
const slackComponent = require('../../data/slackComponents');
const dbModel = require('../../data/dbModels/organizations');
const events = require('events');
const eventEmitter = new events.EventEmitter();

function filterUsersToOnboard(users) {
  const nonBotUsers = users.filter(user => user.is_bot === false);
  return nonBotUsers;
}

function sendOnboardingMessages(userList, token) {
  const message = {
    token,
    attachments: slackComponent.attachments.onboardingAttachments(),
  };

  userList.map(user => {
    message.channel = user.id;
    message.text = `Hi, <@${user.id}>! You have been invited to Bravo, lets get you onboarded 🙌`;
    slackModel.message.postOpenMessage(message);
  });
}

exports.sendUserOnboardingMessage = async reqInfo => {
  try {
    const { access_token } = await dbModel.read(reqInfo.team_id);
    const message = {
      channel: reqInfo.channel_id,
      user: reqInfo.user_id,
      text: `*Hi, what would you like to do?*`,
      token: access_token,
      attachments: slackComponent.attachments.helpOnboardingAttachments(),
    };

    await slackModel.message.postMessage(message);
  } catch (err) {
    console.log(err);
  }
};

exports.sendUserHelpMessage = async reqInfo => {
  try {
    const { access_token } = await dbModel.read(reqInfo.team_id);
    const message = {
      channel: reqInfo.channel_id,
      user: reqInfo.user_id,
      text: `Hi, <@${reqInfo.user_id}>! Seems you need help using bravo, lets get you onboarded 🙌`,
      token: access_token,
      attachments: JSON.stringify([
        {
          fallback: 'Bravo Onboarding Message',
          callback: 'installation onboarding',
          attachment_type: 'default',
          text: '*How it works?* \n Just type `/bravo` and I will guide you through the process.',
          color: '#4265ED',
        },
      ]),
    };

    await slackModel.message.postMessage(message);
  } catch (err) {
    console.log(err);
  }
};

exports.onBoardUsers = async orgId => {
  try {
    const { access_token } = await dbModel.read(orgId);
    const res = await slackModel.user.getWorkspaceUser(access_token);
    const users = filterUsersToOnboard(res.members);

    await sendOnboardingMessages(users, access_token);
  } catch (err) {
    console.log(err);
  }
};

exports.completeInstall = async installData => {
  try {
    const organizationDetails = {
      slack_org_id: installData.orgId,
      name: installData.orgName,
      channel_name: installData.channelName,
      channel_id: installData.channelId,
      access_token: installData.accessToken,
      bot_access_token: installData.botAccessToken,
    };
    dbModel.create(organizationDetails);
  } catch (err) {
    console.log(err);
  }
};
