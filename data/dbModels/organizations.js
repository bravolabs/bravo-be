const db = require('../dbConfig');
const util = require('util');

async function create(organization) {
  const insert = db('organizations')
    .insert(organization)
    .toString();

  const update = db('organizations')
    .update(organization, '*')
    .whereRaw('organizations.slack_org_id = ?', [organization.slack_org_id]);

  const query = util.format(
    '%s ON CONFLICT (slack_org_id) DO UPDATE SET %s',
    insert.toString(),
    update.toString().replace(/^update\s.*\sset\s/i, '')
  );

  await db.raw(query);
}

function read(slack_org_id = null) {
  if (slack_org_id) {
    return db('organizations')
      .where({ slack_org_id })
      .first();
  }
  return db('organizations');
}

function update(id, changes) {
  return db('organizations')
    .update(changes, '*')
    .where({ id });
}

function remove(id) {
  return db('organizations')
    .delete()
    .where({ id })
    .returning('*');
}

module.exports = {
  create,
  read,
  update,
  remove,
};
