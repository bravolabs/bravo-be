const shoutouts = require('../data/dbModels/shoutouts');

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

module.exports = {
  getShoutouts,
};
