const Organization = require('../../data/dbModels/organizations');
const User = require('../../data/dbModels/users');
const { slackModel } = require('../../data/slackModels/slack');

async function getUser(userSlackId, orgId, accessToken) {
  try {
    const userOtherInfo = await slackModel.user.getUser(userSlackId, accessToken);
    const name = userOtherInfo.user.profile.real_name;
    const avatar = userOtherInfo.user.profile.image_512;
    const email = userOtherInfo.user.profile.email;

    let user = await User.readBySlackId(userSlackId);
    let { id } = await Organization.read(orgId);

    const userData = {
      org_id: id,
      slack_mem_id: userSlackId,
      email,
      name,
      avatar,
    };
    user = await User.create(userData);
    return user;
  } catch (err) {
    console.log(err.message);
  }
}

exports.getUser = getUser;
