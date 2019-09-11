const db = require('../dbConfig');

async function create(wallet) {
  try {
    const result = await db('wallets')
      .insert(wallet)
      .returning('*');
    return result[0];
  } catch (err) {
    console.log(err);
  }
}

async function readByUserId(userId) {
  try {
    if (!userId) throw new Error('No userId provided');
    return db('wallets')
      .where({ user_id: userId })
      .first();
  } catch (error) {
    console.log(err);
  }
}

async function updateByUserId(userId, amount) {
  try {
    if (!userId) throw new Error('No userId provided');
    if (!amount) throw new Error('No amount provided');
    const result = await db('wallets')
      .update({ amount }, '*')
      .where({ user_id: userId });
    return result[0];
  } catch (error) {
    console.log(err);
  }
}

async function getWalletLeaderboard(orgId, offset = 0, limit = 50) {
  return db
    .select(
      db.ref('w.amount').as('wallet'),
      db.ref('u.slack_mem_id').as('slack_mem_id'),
      db.ref('u.name').as('name'),
      db.ref('u.avatar').as('avatar')
    )
    .from(db.ref('wallets').as('w'))
    .join(db.ref('users').as('u'), 'w.user_id', 'u.id')
    .whereRaw(`u.org_id = ${orgId}`)
    .orderBy('amount', 'desc')
    .limit(limit)
    .offset(offset);
}

module.exports = {
  create,
  readByUserId,
  updateByUserId,
  getWalletLeaderboard,
};
