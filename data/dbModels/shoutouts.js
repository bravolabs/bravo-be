const db = require('../dbConfig');

async function create(shoutout) {
  try {
    const result = await db('shoutouts')
      .insert(shoutout)
      .returning('*');
    return result[0];
  } catch (err) {
    console.log(err);
  }
}

async function read(userId) {
  try {
    if (userId) {
      const results = await db('shoutouts')
        .where('giver_id', userId)
        .orWhere('receiver_id', userId);
      return results;
    } else {
      return await db('shoutouts');
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  create,
  read,
};
