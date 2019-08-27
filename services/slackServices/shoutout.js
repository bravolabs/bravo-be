const { slackModel } = require('../../data/slackModels/slack');
const Organization = require('../../data/dbModels/organizations');
const { slack } = require('../../config');
const events = require('events');
const eventEmitter = new events.EventEmitter();

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
              name: 'Give Shoutout',
              text: 'Give Shoutout',
              type: 'button',
              value: 'give',
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
      console.log('retrieve');
    }
  } catch (err) {
    console.log(err);
  }
};

exports.submitDialog = async reqInfo => {
  try {
    const org = await Organization.read(reqInfo.team);
    const message = {
      channel: reqInfo.channelId,
      user: reqInfo.userId,
      text: `You have sent a shoutout to <@${reqInfo.recipient}> 🙌🙌`,
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

    await slackModel.message.postMessage(message);

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
  } catch (err) {
    console.log(err);
  }
};
