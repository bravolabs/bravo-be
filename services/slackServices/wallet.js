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
  } catch (err) {
    console.log(err);
  }
};
