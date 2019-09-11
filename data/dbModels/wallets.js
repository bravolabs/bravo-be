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

async function getWalletLeaderboard(orgId) {}

module.exports = {
  create,
  readByUserId,
  updateByUserId,
  getWalletLeaderboard,
};
