const User = require('../../data/dbModels/users');
const { slackModel } = require('../../data/slackModels/slack');
const { getUserWallet } = require('../wallet');

exports.getUserWalletBalance = async slackUserId => {
  try {
    if (!slackUserId) throw new Error('provide slack userid please');
  } catch (err) {
    console.log(err);
  }
};
