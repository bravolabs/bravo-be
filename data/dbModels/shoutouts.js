const db = require('../dbConfig');

async function create(shoutout) {
  const result = await db('shoutouts')
    .insert(shoutout)
    .returning('*');

  return result[0];
}

function read(receiver_id = null, id = null) {
  if (receiver_id) {
    return db
      .select(
        's.id',
        'message',
        'created_at',
        db.ref('g.slack_mem_id').as('giverSlackId'),
        db.ref('r.slack_mem_id').as('receiverSlackId')
      )
      .from(db.ref('shoutouts').as('s'))
      .join(db.ref('users').as('g'), 's.giver_id', 'g.id')
      .join(db.ref('users').as('r'), 's.receiver_id', 'r.id')
      .whereRaw(`s.receiver_id = ${receiver_id}`);
  }

  return db
    .select(
      's.id',
      'message',
      'created_at',
      db.ref('g.slack_mem_id').as('giverSlackId'),
      db.ref('r.slack_mem_id').as('receiverSlackId')
    )
    .from(db.ref('shoutouts').as('s'))
    .join(db.ref('users').as('g'), 's.giver_id', 'g.id')
    .join(db.ref('users').as('r'), 's.receiver_id', 'r.id')
    .whereRaw(`s.id = ${id}`)
    .first();
}

module.exports = {
  create,
  read,
};
