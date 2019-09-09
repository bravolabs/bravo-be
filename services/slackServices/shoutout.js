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
    // respond to user commmand with interactive message
    const org = await Organization.read(reqInfo.team_id);
    const { channel_id, user_id } = reqInfo;
    const data = {
      channel_id,
      user_id,
      access_token: org.access_token,
    };

    const message = slackComponent.message.private(data);
    message.attachments = slackComponent.attachments.shoutOutResponse();

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
    const { channelId, userId, recipient } = reqInfo;
    const org = await Organization.read(reqInfo.team);
    const senderConfirmationText = `You have sent a shoutout to <@${reqInfo.recipient}> 🙌 on <#${org.channel_id}>`;
    const receiverConfirmationText = `*Hurray, You are the newest shoutout Recipient* 🎉🎉 \n You just received a shoutout from <@${reqInfo.userId}> on <#${org.channel_id}>`;

    const data = {
      channel_id: channelId,
      user_id: userId,
      access_token: org.access_token,
    };

    const receiverData = {
      channel_id: recipient,
      user_id: userId,
      access_token: org.access_token,
    };

    const dbInfo = {
      giver_id: reqInfo.userId,
      receiver_id: reqInfo.recipient,
      message: reqInfo.content,
      organization_id: org.slack_org_id,
      access_token: org.access_token,
    };

    const message = slackComponent.message.private(data);
    const recipientAlert = slackComponent.message.public(receiverData);

    message.attachments = slackComponent.attachments.confirmation(senderConfirmationText);
    recipientAlert.attachments = slackComponent.attachments.confirmation(receiverConfirmationText);

    await slackModel.message.postMessage(message);
    await slackModel.message.postOpenMessage(recipientAlert);
    const storedShoutOut = await ShoutOutHelper.saveToDatabase(dbInfo);

    const channelAlert = slackComponent.message.public({
      channel_id: org.channel_id,
      access_token: org.access_token,
      text: `<@${userId}> sent a shoutout to <@${recipient}> 🎉`,
    });

    channelAlert.attachments = slackComponent.attachments.channelNotification({
      content: reqInfo.content,
      clientUrl,
      id: storedShoutOut.id,
      footer: 'powered by Bravo Labs',
    });

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
    const { channelId, user_id } = reqInfo;
    const data = {
      channel_id: channelId,
      user_id,
      access_token: org.access_token,
    };

    // prevent user from giving themself a shoutout
    if (userShoutouts.length === 0 || !user) {
      const noShoutoutText =
        "Yo! the selected user hasn't received or given a shoutout, you can start with `/bravo shoutout`";

      message = slackComponent.message.private(data);
      message.attachments = slackComponent.attachments.confirmation(noShoutoutText);
    } else {
      const shoutoutsIntroText = `Here are the last *${userShoutouts.length}* shoutouts sent and recieved by <@${reqInfo.userId}> 🎉\n`;

      message = slackComponent.message.private(data);
      message.attachments = slackComponent.attachments.confirmation(shoutoutsIntroText);
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

      messageConfig = {
        channel_id: channelId,
        user_id,
        access_token: org.access_token,
      };

      const messageList = slackComponent.message.private(messageConfig);
      messageList.attachments = slackComponent.attachments.channelNotification(data, 'view');

      await slackModel.message.postMessage(messageList);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.sendPublicUrl = async reqInfo => {
  const org = await Organization.read(reqInfo.team);
  const text = `Here is the public url you requested <${reqInfo.link}>`;
  const message = slackComponent.message.public({
    channel_id: reqInfo.user_id,
    access_token: org.access_token,
  });
  message.attachments = slackComponent.attachments.confirmation(text);
  await slackModel.message.postOpenMessage(message);
};

exports.cheatErrorMessage = async reqInfo => {
  const org = await Organization.read(reqInfo.team);
  const text = `Sorry, but you cannot give yourself a shoutout ⚠️`;
  const message = slackComponent.message.private({
    channel_id: reqInfo.channelId,
    user_id: reqInfo.userId,
    token: org.access_token,
  });
  message.attachments = slackComponent.attachments.errorALert(text);

  await slackModel.message.postMessage(message);
};
