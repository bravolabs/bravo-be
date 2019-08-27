const { slackModel } = require('../../data/slackModels/slack');
const { slack } = require('../../config');
const events = require('events');
const eventEmitter = new events.EventEmitter();

exports.sendShoutOut = async reqInfo => {
  try {
    // respond to user commmand with interactive message
    const message = {
      channel: reqInfo.channel_id,
      user: reqInfo.user_id,
      token: slack.slackToken,
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

    await slackModel.message.postMessage(message);

    // find and create channel
    const channels = await slackModel.channel.getAllChannels();
    const channel = await slackModel.channel.findChannel(
      slack.designatedChannel,
      channels.channels
    );

    if (channel.length !== 0) {
      console.log('channel exists');
    } else {
      await slackModel.channel.createChannel(slack.designatedChannel);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.respondToInteractiveMessage = async reqInfo => {
  try {
    if (reqInfo.actions[0].value === 'give') {
      const dialog = {
        token: slack.slackToken,
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
    const message = {
      channel: reqInfo.channelId,
      user: reqInfo.userId,
      text: `You have sent a shoutout to <@${reqInfo.recipient}> 🙌🙌`,
      token: slack.slackToken,
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
      channel: slack.designatedChannel,
      text: `<@${reqInfo.userId}> sent a shoutout to <@${reqInfo.recipient}>! 🎉🎉`,
      token: slack.slackToken,
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
      token: slack.slackToken,
      title: 'Hurray, You are the newest shoutout Recipient',
      text: `You just received a shoutout from <@${reqInfo.userId}>`,
    };

    await slackModel.message.postOpenMessage(recipientAlert);
  } catch (err) {
    console.log(err);
  }
};
