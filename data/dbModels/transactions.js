const db = require('../dbConfig');
const util = require('util');

async function create(transaction) {
  try {
    const result = await db('transactions')
      .insert(transaction)
      .returning('*');
    return result[0];
  } catch (err) {
    console.log(err);
  }
}

const transactionsFullyJoined = () => {
  return db
    .select(
      db.ref('t.id').as('id'),
      'created_at',
      db.ref('o.id').as('orgId'),
      db.ref('g.slack_mem_id').as('giverSlackId'),
      db.ref('g.name').as('giverName'),
      db.ref('g.avatar').as('giverAvatar'),
      db.ref('r.slack_mem_id').as('receiverSlackId'),
      db.ref('r.name').as('receiverName'),
      db.ref('r.avatar').as('receiverAvatar'),
      db.ref('a.reward').as('reward'),
      db.ref('a.name').as('action')
    )
    .from(db.ref('transactions').as('t'))
    .join(db.ref('users').as('g'), 't.giver_id', 'g.id')
    .join(db.ref('users').as('r'), 't.receiver_id', 'r.id')
    .join(db.ref('organisations').as('o'), 't.org_id', 'o.id')
    .join(db.ref('actions').as('a'), 't.action_id', 'a.id');
};

async function read(orgId, offset = 0, limit = 50) {
  try {
    if (!orgId) throw new Error('No orgId provided');
    return db
      .select(
        db.ref('t.id').as('id'),
        'created_at',
        db.ref('t.org_id').as('orgId'),
        db.ref('a.reward').as('reward'),
        db.ref('a.name').as('action')
      )
      .from(db.ref('transactions').as('t'))
      .join(db.ref('actions').as('a'), 't.action_id', 'a.id')
      .whereRaw(`t.org_id = ${orgId}`)
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset);
  } catch (err) {
    console.log(err);
  }
}

async function readByUser(userId, offset = 0, limit = 20) {
  try {
    if (!userId) throw new Error('No userId provided');
    return transactionsFullyJoined()
      .whereRaw(`t.receiver_id = ${userId} OR t.giver_id = ${userId}`)
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset);
  } catch (err) {
    console.log(err);
  }
}

async function readWithData(orgId, offset = 0, limit = 20) {
  try {
    if (!orgId) throw new Error('No orgId provided');
    return transactionsFullyJoined()
      .whereRaw(`t.org_id = ${orgId}`)
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  create,
  readWithData,
  readByUser,
  read,
};
