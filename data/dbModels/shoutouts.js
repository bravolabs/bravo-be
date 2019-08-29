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

async function read(receiver_id) {
  try {
    const results = await db('shoutouts')
      .where({ receiver_id })
      .first();
    return result;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  create,
  read,
};
