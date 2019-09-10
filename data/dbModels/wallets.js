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

module.exports = {
  create,
};
