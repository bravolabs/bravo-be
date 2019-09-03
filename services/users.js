const users = require('../data/dbModels/users');
const shoutouts = require('../data/dbModels/shoutouts');
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

module.exports = {
  getShoutouts,
};
