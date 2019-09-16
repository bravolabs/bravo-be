const transaction = require('../wallet');
const User = require('../../data/dbModels/users');
const Organization = require('../../data/dbModels/organizations');
const Shoutout = require('../../data/dbModels/shoutouts');

exports.givePoint = async reqInfo => {
  try {
    const reactingUser = await User.readBySlackId(reqInfo.user);
    const organization = await Organization.read(reqInfo.org_id);
    const shoutout = await Shoutout.readByTimestamp(reqInfo.ts);
    await transaction.ProcessTransaction(
      reactingUser.id,
      shoutout.giver_id,
      organization.id,
      shoutout.id,
      reqInfo.action,
      reqInfo.fund
    );
    // send a message to the user tellig them what the total amount of coins they have is and that th received 1coin
  } catch (err) {
    console.log(err);
  }
};
