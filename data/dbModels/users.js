const db = require('../dbConfig');

async function create(user) {
  const result = await db('users')
    .insert(user)
    .returning('*');

  return result[0];
}

function readBySlackId(slack_mem_id) {
  return db('users')
    .where({ slack_mem_id })
    .first();
}

module.exports = {
  create,
  readBySlackId,
};
