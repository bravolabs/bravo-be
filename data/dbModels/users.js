const db = require('../dbConfig');

async function create(user) {
  const result = await db('users')
    .insert(user)
    .returning('*');

  return result[0];
}

function read(slack_mem_id = null, org_id = null) {
  if (slack_mem_id) {
    return db('users')
      .where({ slack_mem_id })
      .first();
  }
}

module.exports = {
  create,
  read,
};
