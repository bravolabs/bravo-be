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

  return db
    .select(
      'id',
      'name',
      'email',
      db.ref('org_id').as('organizationId'),
      db.ref('slack_mem_id').as('userSlackId')
    )
    .from('users')
    .where({ org_id });
}

module.exports = {
  create,
  read,
};
