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

async function update(id, shoutout) {
  try {
    const result = await db('shoutouts')
      .update(shoutout)
      .where({ id })
      .returning('*');
  } catch (err) {
    console.log(err);
  }
}

async function readAll() {
  try {
    return await db('shoutouts');
  } catch (err) {
    console.log(err);
  }
}

async function read(userId = null, id = null) {
  if (userId) {
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
      .join(db.ref('users').as('g'), 's.giver_id', 'g.id')
      .join(db.ref('users').as('r'), 's.receiver_id', 'r.id')
      .whereRaw(`s.receiver_id = ${userId} OR s.giver_id = ${userId}`)
      .orderBy('created_at', 'desc');
  }

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
    .join(db.ref('users').as('g'), 's.giver_id', 'g.id')
    .join(db.ref('users').as('r'), 's.receiver_id', 'r.id')
    .whereRaw(`s.id = ${id}`)
    .first();
}

async function readByTimestamp(timestamp) {
  try {
    return await db('shoutouts')
      .where({ message_ts: timestamp })
      .first();
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  create,
  read,
  update,
  readAll,
  readByTimestamp,
};
