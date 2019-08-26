const { slackModel } = require('../../data/slackModels/slack');
const { slack } = require('../../config');

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
