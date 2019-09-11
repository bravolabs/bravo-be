const User = require('../../data/dbModels/users');
const Organization = require('../../data/dbModels/organizations');
const slackComponent = require('../../data/slackComponents');
const { getUserWallet } = require('../wallet');
const { slackModel } = require('../../data/slackModels/slack');

exports.getUserWalletBalance = async slackUserId => {
  try {
    if (!slackUserId) throw new Error('provide slack userid please');
  } catch (err) {
    console.log(err);
  }
};
