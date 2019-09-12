const shoutouts = require('../data/dbModels/shoutouts');
const users = require('../data/dbModels/users');
const organization = require('../data/dbModels/organizations');
const { slackModel } = require('../data/slackModels/slack');

async function getShoutouts(id) {
  const result = await shoutouts.read(null, id);
  if (!result || !result.id) {
    return {
      statusCode: 404,
      data: {
        message: 'No shoutout found',
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

  return user;
async function getShoutoutReplies(id) {
  const result = await shoutouts.read(null, id);
  if (!result || !result.id) {
    return {
      statusCode: 404,
      data: {
        message: 'No shoutout found',
      },
    };
  }
  const user = await users.readBySlackId(result.giverSlackId);
  const organizationData = await organization.read(null, user.org_id);
  const slackResponse = await slackModel.message.getThread({
    token: organizationData.access_token,
    channel: organizationData.channel_id,
    ts: result.message_ts,
  });
  const replies = slackResponse.messages.filter(
    reply => !reply.subtype || !reply.subtype === 'bot_message'
  );
  return {
    statusCode: 200,
    data: {
      data: replies,
    },
  };
}

module.exports = {
  getShoutouts,
  getShoutoutReplies,
};
