const db = require('../dbConfig');
const util = require('util');

async function create(action) {
  try {
    const result = await db('actions')
      .insert(action)
      .returning('*');
    return result[0];
  } catch (err) {
    console.log(err);
  }
}

async function readById(id) {
  try {
  } catch (err) {
    console.log(err);
  }
}
