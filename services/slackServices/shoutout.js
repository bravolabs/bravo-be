const { slackModel } = require('../../data/slackModels/slack');
const { slack } = require('../../config');
const events = require('events');
const eventEmitter = new events.EventEmitter();

exports.sendShoutOut = async message => {
  try {
    // respond to user commmand with interactive message
    await slackModel.postMessage(message);

    // find and create channel
    const channels = await slackModel.getAllChannels();
    const channel = await slackModel.findChannel(slack.designatedChannel, channels.channels);

    if (channel.length !== 0) {
      console.log('channel exists');
    } else {
      await slackModel.createChannel(slack.designatedChannel);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.respondToInteractiveMessage = async (actions, dialog) => {
  try {
    if (actions[0].value === 'give') {
      await slackModel.createDialog(dialog);
    } else if (actions[0].value === 'retrieve') {
      console.log('retrieve');
    }
  } catch (err) {
    console.log(err);
  }
};

exports.submitDialog = async reqInfo => {
  try {
    const message = {
      channel: reqInfo.channel_id,
      user: reqInfo.user_id,
      text: `You have sent a shoutout to <@${reqInfo.user_name}> 🙌🙌`,
      token: slack.slackToken,
      attachments: JSON.stringify([
        {
          callback_id: 'submitDialog',
          attachment_type: 'default',
          title: 'Shoutout:',
          text: `${reqInfo.content}`,
          color: '#7ed692',
        },
      ]),
    };

    await slackModel.postMessage(message);

    // Add an event emitter to emit an event once their is a successful shoutout, so the
    // listeners can take over and send the necessary notifications

    eventEmitter.emit('successful_shoutout', {
      user: reqInfo.user_id,
      recipient: reqInfo.user_name,
      message: reqInfo.content,
    });
  } catch (err) {
    console.log(err);
  }
};
