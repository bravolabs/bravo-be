const { slackModel } = require('../../data/slackModels/slack');
const Organization = require('../../data/dbModels/organizations');
const ShoutOutHelper = require('./shoutout.helpers');
const ShoutOut = require('../../data/dbModels/shoutouts');
const User = require('../../data/dbModels/users');

exports.sendShoutOut = async reqInfo => {
  try {
    const org = await Organization.read(reqInfo.team_id);
    // respond to user commmand with interactive message
    const message = {
      channel: reqInfo.channel_id,
      user: reqInfo.user_id,
      token: org.access_token,
      attachments: JSON.stringify([
        {
          fallback: 'Message from BRAVO',
          callback_id: 'shoutout',
          attachment_type: 'default',
          title: 'Shoutout Options',
          text: 'kindly select an option for your bot task',
          color: '#4265ED',
          divider: true,
          actions: [
            {
              name: 'Send a Shoutout',
              text: 'Send a Shoutout',
              type: 'button',
              value: 'give',
              style: 'default',
            },
            {
              name: 'View shoutouts',
              text: 'View shoutouts',
              type: 'button',
              value: 'retrieve',
              style: 'default',
            },
          ],
        },
      ]),
    };

    message.channel.toString();

    await slackModel.message.postMessage(message);
  } catch (err) {
    console.log(err);
  }
};

exports.respondToInteractiveMessage = async reqInfo => {
  try {
    const org = await Organization.read(reqInfo.team);
    if (reqInfo.actions[0].value === 'give') {
      const dialog = {
        token: org.access_token,
        trigger_id: reqInfo.triggerId,
        dialog: JSON.stringify({
          title: 'Send Shoutout',
          callback_id: 'shoutout',
          submit_label: 'Send',
          elements: [
            {
              label: 'Who do you want to send a shoutout to?',
              placeholder: 'Choose a person',
              type: 'select',
              name: 'Recipient',
              optional: false,
              data_source: 'users',
            },
            {
              label: 'Shoutout message',
              type: 'textarea',
              name: 'ShoutOut',
              optional: false,
              placeholder: 'Write your shoutout message',
            },
          ],
        }),
      };

      await slackModel.message.createDialog(dialog);
    } else if (reqInfo.actions[0].value === 'retrieve') {
      const dialog = {
        token: org.access_token,
        trigger_id: reqInfo.triggerId,
        dialog: JSON.stringify({
          title: 'View shoutouts',
          callback_id: 'view-shoutout',
          submit_label: 'View',
          elements: [
            {
              label: 'Who do you want to see their shoutouts?',
              placeholder: 'Choose a person',
              type: 'select',
              name: 'user',
              optional: false,
              data_source: 'users',
            },
          ],
        }),
      };

      await slackModel.message.createDialog(dialog);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.submitDialog = async reqInfo => {
  try {
    const org = await Organization.read(reqInfo.team);
    const message = {
      channel: reqInfo.userId,
      user: reqInfo.userId,
      text: `You have sent a shoutout to <@${reqInfo.recipient}> 🙌`,
      token: org.access_token,
      attachments: JSON.stringify([
        {
          callback_id: 'submitDialog',
          attachment_type: 'default',
          title: 'Shoutout:',
          text: `${reqInfo.content}`,
          color: '#4265ED',
        },
      ]),
    };
    await slackModel.message.postOpenMessage(message);

    const channelAlert = {
      channel: org.channel_id,
      text: `<@${reqInfo.userId}> sent a shoutout to <@${reqInfo.recipient}>! 🎉🎉`,
      token: org.access_token,
      attachments: JSON.stringify([
        {
          callback_id: 'alert message',
          attachment_type: 'default',
          title: 'Shoutout:',
          text: `${reqInfo.content}`,
          color: '#4265ED',
        },
      ]),
    };
    await slackModel.message.postOpenMessage(channelAlert);

    const recipientAlert = {
      channel: reqInfo.recipient,
      token: org.access_token,
      title: 'Hurray, You are the newest shoutout Recipient',
      text: `You just received a shoutout from <@${reqInfo.userId}> on <#${org.channel_id}>`,
    };
    await slackModel.message.postOpenMessage(recipientAlert);

    const dbInfo = {
      giver_id: reqInfo.userId,
      receiver_id: reqInfo.recipient,
      message: reqInfo.content,
    };
    const shoutoutData = await ShoutOutHelper.saveToDatabase(dbInfo);
    await ShoutOut.create(shoutoutData);
  } catch (err) {
    console.log(err);
  }
};

// for now let us only be able to return users recieved shoutouts
exports.getUserShoutOuts = async reqInfo => {
  try {
    const org = await Organization.read(reqInfo.team);
    const { id } = await User.readBySlackId(reqInfo.userId);
    const userShoutouts = await ShoutOut.read(id);

    // post title message firsst
    const message = {
      channel: reqInfo.channelId,
      user: reqInfo.user_id,
      token: org.access_token,
      text: `Here are the last ${userShoutouts.length} shoutouts sent and recieved by <@${reqInfo.userId}> 🎉\n`,
    };

    await slackModel.message.postMessage(message);

    // loop through shoutouts and post each one
    userShoutouts.map(async indiv => {
      const giverSlackId = await User.readById(indiv.giver_id);
      const receiverSlackId = await User.readById(indiv.receiver_id);

      const messageList = {
        channel: reqInfo.channelId,
        user: reqInfo.user_id,
        token: org.access_token,

        attachments: JSON.stringify([
          {
            fallback: 'Message from Bravo',
            callback_id: 'individual_shoutout',
            attachment_type: 'default',
            text: `\n <@${giverSlackId.slack_mem_id}> sent a shoutout to <@${receiverSlackId.slack_mem_id}> 🎉\n${indiv.message}`,
            color: '#4265ED',
            actions: [
              {
                type: 'button',
                text: 'View',
                url: 'https://flights.example.com/book/r123456',
              },
            ],
            footer: `Bravo | ${indiv.created_at}`,
          },
        ]),
      };
      await slackModel.message.postMessage(messageList);
    });
  } catch (err) {
    console.log(err);
  }
};
