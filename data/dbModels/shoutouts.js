const db = require('../dbConfig');

async function create(shoutout) {
  const result = await db('shoutouts')
    .insert(shoutout)
    .returning('*');

  return result[0];
}

function read(receiver_id) {
  return db('shoutouts').where({ receiver_id });
}

module.exports = {
  create,
  read,
};
