const axios = require('axios');
const jwt = require('jsonwebtoken');
const { secret, slack } = require('../config');
const organizations = require('../data/dbModels/organizations');
const users = require('../data/dbModels/users');

async function loginUser(accessToken, userId) {
  // get user infomation from slack
  const { data: slackRes } = await axios.get(
    `${slack.baseUrl}/users.info?token=${accessToken}&user=${userId}`
  );
  if ('user' in slackRes) {
    const { user: slackUser } = slackRes;
    // get user's organization
    const userOrg = await organizations.read(slackUser.team_id);
    if (userOrg) {
      // if organization on Db check if user, else create user
      let user = await users.readBySlackId(userId);
      if (!user) {
        user = await users.create({
          name: slackUser.real_name,
          slack_mem_id: slackUser.id,
          org_id: userOrg.id,
          avatar: slackUser.profile.image_512,
        });
      }
      const token = jwt.sign(user, secret, { expiresIn: '30d' });
      return {
        // successful authentication response
        statusCode: 200,
        data: {
          id: user.id,
          orgId: user.org_id,
          name: user.name,
          avatar: user.avatar,
          token,
        },
      };
    } else {
      return {
        statusCode: 404,
        data: {
          message: 'Workspace not found. Please contact your workspace admin to install Bravo',
        },
      };
    }
  }

  throw new Error(slackRes.error);
}

module.exports = {
  loginUser,
};
