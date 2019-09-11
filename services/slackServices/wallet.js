const User = require('../../data/dbModels/users');
const Organization = require('../../data/dbModels/organizations');
const slackComponent = require('../../data/slackComponents');
const { getUserWallet } = require('../wallet');
const { slackModel } = require('../../data/slackModels/slack');

exports.getUserWalletBalance = async slackUserId => {
  try {
    const { user_id, channel_id, team_id } = reqInfo;
    if (!user_id) throw new Error('provide slack userid please');
    const user = await User.readBySlackId(user_id);
    if (!user) throw new Error('user does not exist on the database');
    const wallet = await getUserWallet(user.id);

    const org = await Organization.read(team_id, null);
    const messageConfig = {
      channel_id,
      user_id,
      access_token: org.access_token,
    };

    const message = slackComponent.message.private(messageConfig);
    message.text = `<@${user_id}> requested his wallet count`;
    message.attachments = JSON.stringify([
      {
        callback_id: 'alert message',
        attachment_type: 'default',
        title: 'Wallet:',
        text: `You currently have ${wallet.data.data.amount} bravos in your wallet 🎈`,
        color: '#4265ED',
      },
    ]);
  } catch (err) {
    console.log(err);
  }
};
