const shoutouts = require('../data/dbModels/shoutouts');

async function getShoutouts(id) {
  const result = await shoutouts.read(null, id);
  if (result.length < 1) {
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
