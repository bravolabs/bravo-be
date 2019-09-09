const { slackModel } = require('../../data/slackModels/slack');
const slackComponent = require('../../data/slackComponents');
const Organization = require('../../data/dbModels/organizations');
const ShoutOutHelper = require('./shoutout.helpers');
const ShoutOut = require('../../data/dbModels/shoutouts');
const User = require('../../data/dbModels/users');
const { clientUrl } = require('../../config');
const moment = require('moment');

// please do not delete the commented function below, useful in the future

// function randomGifs() {
//   const gifArray = [
//     'https://media0.giphy.com/media/xJjs8eGVbjNYY/giphy.gif',
//     'http://giphygifs.s3.amazonaws.com/media/dsMFrxB2agKf6/giphy.gif',
//     'https://media.giphy.com/media/iyGfMZYxDQBSE/giphy.gif',
//     'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif',
//     'https://media.giphy.com/media/kBZBlLVlfECvOQAVno/giphy.gif',
//   ];

//   const randomInt = Math.floor(Math.random() * Math.floor(gifArray.length));
//   return gifArray[randomInt];
// }

exports.sendShoutOut = async reqInfo => {
  try {
    const org = await Organization.read(reqInfo.team_id);
    // respond to user commmand with interactive message
    const message = {
      channel: reqInfo.channel_id,
      user: reqInfo.user_id,
      token: org.access_token,
      attachments: slackComponent.attachments.shoutOutResponse(),
    };

    await slackModel.message.postMessage(message);
  } catch (err) {
    console.log(err);
  }
};

exports.respondToInteractiveMessage = async reqInfo => {
  try {
    const org = await Organization.read(reqInfo.team);
    if (reqInfo.actions[0].value === 'give') {
      const data = {
        access_token: org.access_token,
        trigger_id: reqInfo.triggerId,
      };
      const dialog = slackComponent.dialog.giveShoutOutDialog(data);

      await slackModel.message.createDialog(dialog);
    } else if (reqInfo.actions[0].value === 'retrieve') {
      const data = {
        access_token: org.access_token,
        trigger_id: reqInfo.triggerId,
      };
      const dialog = slackComponent.dialog.retrieveShoutoutDialog(data);

      await slackModel.message.createDialog(dialog);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.submitDialog = async reqInfo => {
  try {
    const org = await Organization.read(reqInfo.team);
    const senderConfirmationText = `You have sent a shoutout to <@${reqInfo.recipient}> 🙌 on <#${org.channel_id}>`;
    const receiverConfirmationText = `*Hurray, You are the newest shoutout Recipient* 🎉🎉 \n You just received a shoutout from <@${reqInfo.userId}> on <#${org.channel_id}>`;

    const message = {
      channel: reqInfo.channelId,
      user: reqInfo.userId,
      token: org.access_token,
      attachments: slackComponent.attachments.confirmation(senderConfirmationText),
    };
    const recipientAlert = {
      channel: reqInfo.recipient,
      token: org.access_token,
      attachments: slackComponent.attachments.confirmation(receiverConfirmationText),
    };
    const dbInfo = {
      giver_id: reqInfo.userId,
      receiver_id: reqInfo.recipient,
      message: reqInfo.content,
      organization_id: org.slack_org_id,
      access_token: org.access_token,
    };

    await slackModel.message.postMessage(message);
    await slackModel.message.postOpenMessage(recipientAlert);
    const storedShoutOut = await ShoutOutHelper.saveToDatabase(dbInfo);

    const channelAlert = {
      channel: org.channel_id,
      text: `<@${reqInfo.userId}> sent a shoutout to <@${reqInfo.recipient}> 🎉`,
      token: org.access_token,
      attachments: slackComponent.attachments.channelNotification({
        content: reqInfo.content,
        clientUrl,
        id: storedShoutOut.id,
        footer: 'powered by Bravo Labs',
      }),
    };
    await slackModel.message.postOpenMessage(channelAlert);
  } catch (err) {
    console.log(err);
  }
};

exports.getUserShoutOuts = async reqInfo => {
  try {
    const org = await Organization.read(reqInfo.team);
    const user = await User.readBySlackId(reqInfo.userId);
    const id = user ? user.id : 0;
    const userShoutouts = await ShoutOut.read(id);

    // post title message firsst
    let message;
    if (userShoutouts.length === 0 || !user) {
      const noShoutoutText =
        "Yo! the selected user hasn't received or given a shoutout, you can start with `/bravo shoutout`";

      message = {
        channel: reqInfo.channelId,
        user: reqInfo.user_id,
        token: org.access_token,
        attachments: slackComponent.attachments.confirmation(noShoutoutText),
      };
    } else {
      const shoutoutsIntroText = `Here are the last *${userShoutouts.length}* shoutouts sent and recieved by <@${reqInfo.userId}> 🎉\n`;

      message = {
        channel: reqInfo.channelId,
        user: reqInfo.user_id,
        token: org.access_token,
        attachments: slackComponent.attachments.confirmation(shoutoutsIntroText),
      };
    }

    await slackModel.message.postMessage(message);

    // loop through shoutouts and post each one
    userShoutouts.map(async indiv => {
      const giverSlackId = await User.readBySlackId(indiv.giverSlackId);
      const receiverSlackId = await User.readBySlackId(indiv.receiverSlackId);
      const date = indiv.created_at;

      const data = {
        content: `\n <@${giverSlackId.slack_mem_id}> sent a shoutout to <@${receiverSlackId.slack_mem_id}> 🎉\n${indiv.message}`,
        clientUrl,
        id: indiv.id,
        footer: `Bravo | ${moment(date).format('dddd, MMMM Do YYYY')}`,
      };

      const messageList = {
        channel: reqInfo.channelId,
        user: reqInfo.user_id,
        token: org.access_token,
        attachments: slackComponent.attachments.channelNotification(data),
      };

      await slackModel.message.postMessage(messageList);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.sendPublicUrl = async reqInfo => {
  const org = await Organization.read(reqInfo.team);
  const text = `Here is the public url you requested <${reqInfo.link}>`;
  const message = {
    channel: reqInfo.user_id,
    token: org.access_token,
    attachments: slackComponent.attachments.confirmation(text),
  };
  await slackModel.message.postOpenMessage(message);
};

exports.cheatErrorMessage = async reqInfo => {
  const org = await Organization.read(reqInfo.team);
  const text = `Sorry, but you cannot give yourself a shoutout ⚠️`;
  const message = {
    channel: reqInfo.channelId,
    user: reqInfo.userId,
    token: org.access_token,
    attachments: slackComponent.attachments.errorALert(text),
  };
  await slackModel.message.postMessage(message);
};
