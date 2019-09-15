const transaction = require('../wallet');
const User = require('../../data/dbModels/users');
const Organization = require('../../data/dbModels/organizations');
const Shoutout = require('../../data/dbModels/shoutouts');

exports.giveReactionPoint = async reqInfo => {
  try {
    const reactingUser = await User.readBySlackId(reqInfo.user);
    const organization = await Organization.read(reqInfo.org_id);
    const shoutout = await Shoutout.readByTimestamp(reqInfo.ts);
    const result = await transaction.ProcessTransaction(
      reactingUser.id,
      shoutout.giver_id,
      organization.id,
      shoutout.id,
      'reaction'
    );
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
