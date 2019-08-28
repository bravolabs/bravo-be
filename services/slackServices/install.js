const { slackModel } = require('../../data/slackModels/slack');
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
    attachments: JSON.stringify([
      {
        fallback: 'Bravo Onboarding Message',
        callback: 'installation onboarding',
        attachment_type: 'default',
        text:
          '*How it works?* \n Just type `/bravo` shoutout and I will guide you through the process \n \n  *Our mission:* \n Award your peers with acknowledgments that act like coins/points in Slack when they do awesome things - and never let the acknowledgment of their good work get lost in the shuffle again. \n \n With bravo you will be able to give shoutouts to your team and collegues really easily. Also you will be able to see all the feedback and shoutouts that you get in your dashboard.',
        color: '#4265ED',
      },
    ]),
  };

  userList.map(user => {
    message.channel = user.id;
    message.text = `Hi, <@${user.id}>! You have been invited to Bravo, lets get you onboarded 🙌`;
    slackModel.message.postOpenMessage(message);
  });
}

exports.sendUserOnboardingMessage = async reqInfo => {
  const { access_token } = await dbModel.read(reqInfo.team_id);
  const message = {
    channel: reqInfo.user_id,
    text: `Hi, <@${reqInfo.user_id}>! Seems you need help using bravo, lets get you onboarded 🙌`,
    token: access_token,
    attachments: JSON.stringify([
      {
        fallback: 'Bravo Onboarding Message',
        callback: 'installation onboarding',
        attachment_type: 'default',
        text:
          '*How it works?* \n Just type `/bravo shoutout` and I will guide you through the process \n \n  *Our mission:* \n Award your peers with acknowledgments that act like coins/points in Slack when they do awesome things - and never let the acknowledgment of their good work get lost in the shuffle again. \n \n With bravo you will be able to give shoutouts to your team and collegues really easily. Also you will be able to see all the feedback and shoutouts that you get in your dashboard.',
        color: '#4265ED',
      },
    ]),
  };

  await slackModel.message.postOpenMessage(message);
};

exports.onBoardUsers = async orgId => {
  const { access_token } = await dbModel.read(orgId);
  const res = await slackModel.user.getWorkspaceUser(access_token);
  const users = filterUsersToOnboard(res.members);

  await sendOnboardingMessages(users, access_token);
};

exports.completeInstall = async installData => {
  try {
    const organizationDetails = {
      slack_org_id: installData.orgId,
      name: installData.orgName,
      channel_name: installData.channelName,
      channel_id: installData.channelId,
      access_token: installData.accessToken,
    };
    dbModel.create(organizationDetails);
  } catch (err) {
    console.log(err);
  }
};
