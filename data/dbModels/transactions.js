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
