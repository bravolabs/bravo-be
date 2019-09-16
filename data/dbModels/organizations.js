const db = require('../dbConfig');
const util = require('util');

async function create(organization) {
  try {
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

    let savedOrg;
    await db.raw(query).then(res => {
      savedOrg = res.rows[0];
    });
    return savedOrg;
  } catch (err) {
    console.log(err);
  }
}

async function read(slack_org_id = null, org_id = null) {
  try {
    if (slack_org_id) {
      const org = await db('organizations')
        .where({ slack_org_id })
        .first();
      return org;
    } else if (org_id) {
      const org = await db('organizations')
        .where({ id: org_id })
        .first();
      return org;
    }
    return await db('organizations');
  } catch (err) {
    console.log(err);
  }
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

function getShoutouts(org_id) {
  return db
    .select(
      's.id',
      'message',
      'created_at',
      'message_ts',
      db.ref('g.slack_mem_id').as('giverSlackId'),
      db.ref('g.name').as('giverName'),
      db.ref('g.avatar').as('giverAvatar'),
      db.ref('r.slack_mem_id').as('receiverSlackId'),
      db.ref('r.name').as('receiverName'),
      db.ref('r.avatar').as('receiverAvatar')
    )
    .from(db.ref('shoutouts').as('s'))
    .join(db.ref('users').as('g'), 'giver_id', 'g.id')
    .join(db.ref('users').as('r'), 'receiver_id', 'r.id')
    .whereRaw(`g.org_id = ${org_id} AND r.org_id = ${org_id}`);
}

module.exports = {
  create,
  read,
  update,
  remove,
  getShoutouts,
};
