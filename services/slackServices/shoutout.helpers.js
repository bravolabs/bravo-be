const ShoutOut = require('../../data/dbModels/shoutouts');
const Organization = require('../../data/dbModels/organizations');
const User = require('../../data/dbModels/users');

async function getUser(userSlackId, orgId) {
  try {
    let user = await User.readBySlackId(userSlackId);
    let { id } = await Organization.read(orgId);
    if (!user) {
      const userData = {
        org_id: id,
        slack_mem_id: userSlackId,
      };
      user = await User.create(userData);
      return user;
    }
    return user;
  } catch (err) {
    console.log(err);
  }
}

exports.saveToDatabase = async dbInfo => {
  const reciever = await getUser(dbInfo.receiver_id, dbInfo.organization_id);
  const giver = await getUser(dbInfo.giver_id, dbInfo.organization_id);

  const shoutoutData = {
    giver_id: giver.id,
    receiver_id: reciever.id,
    message: dbInfo.message,
  };
  await ShoutOut.create(shoutoutData);
};
