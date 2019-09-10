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

async function readAllWithData(orgId) {
  try {
    return db
      .select(
        't.id',
        'created_at',
        db.ref('o.id').as('orgId'),
        db.ref('g.slack_mem_id').as('giverSlackId'),
        db.ref('g.name').as('giverName'),
        db.ref('g.avatar').as('giverAvatar'),
        db.ref('r.slack_mem_id').as('receiverSlackId'),
        db.ref('r.name').as('receiverName'),
        db.ref('r.avatar').as('receiverAvatar'),
        db.ref('r.avatar').as('receiverAvatar'),
        db.ref('a.reward').as('reward'),
        db.ref('a.name').as('action')
      )
      .from(db.ref('transactions').as('t'))
      .join(db.ref('users').as('g'), 's.giver_id', 'g.id')
      .join(db.ref('users').as('r'), 's.receiver_id', 'r.id')
      .join(db.ref('organisations').as('o'), 's.org_id', 'o.id')
      .join(db.ref('actions').as('a'), 's.action_id', 'a.id')
      .whereRaw(`s.org_id = ${orgId}`)
      .orderBy('created_at', 'desc');
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  create,
};
