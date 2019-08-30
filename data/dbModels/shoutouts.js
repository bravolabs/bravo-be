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

async function read(id) {
  try {
    const results = await db('shoutouts')
      .where('giver_id', id)
      .orWhere('receiver_id', id);
    return results;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  create,
  read,
};
