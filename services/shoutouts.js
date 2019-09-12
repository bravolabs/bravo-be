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

async function getUser(userId) {
  let user = await users.readBySlackId(userId);
  return user;
}

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
  if (!slackResponse.messages) throw new Error('message not found');
  // filter out bot messages on thread
  let replies = slackResponse.messages.filter(
    reply => !reply.subtype || !reply.subtype === 'bot_message'
  );
  // loop through all messages and add users avatar and name
  newReplies = await Promise.all(
    replies.map(async reply => {
      let user = await getUser(reply.user);
      return {
        id: reply.client_msg_id,
        timestamp: reply.ts,
        text: reply.text,
        name: user.name,
        avatar: user.avatar,
      };
    })
  );
  return {
    statusCode: 200,
    data: {
      data: newReplies,
    },
  };
}

module.exports = {
  getShoutouts,
  getShoutoutReplies,
};
