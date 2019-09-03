const users = require('../data/dbModels/users');
const shoutouts = require('../data/dbModels/shoutouts');
const organizations = require('../data/dbModels/organizations');
const slackUsers = require('./slackServices/users');

async function getShoutouts(userId) {
  const user = await users.readBySlackId(userId);
  if (!user || !user.slack_mem_id) {
    return {
      statusCode: 404,
      data: {
        message: 'User not found',
      },
    };
  }

  const result = await shoutouts.read(user.id);
  if (result.length < 1) {
    return {
      statusCode: 404,
      data: {
        message: 'No shoutouts found for the user',
      },
    };
  }
  return {
    statusCode: 200,
    data: {
      data: result,
    },
  };
}

async function getUserInfo(userId) {
  const user = await users.readBySlackId(userId);
  const org = await organizations.read(null, user.org_id);

  if (!user || !user.slack_mem_id) {
    return {
      statusCode: 404,
      data: {
        message: 'User not found',
      },
    };
  }

  const result = await slackUsers.getUser(userId, org.slack_org_id, org.access_token);
  if (!result) {
    return {
      statusCode: 404,
      data: {
        message: "Couldn't get user info",
      },
    };
  }
  return {
    statusCode: 200,
    data: {
      data: result,
    },
  };
}

module.exports = {
  getShoutouts,
  getUserInfo,
};
