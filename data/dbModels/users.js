const db = require('../dbConfig');

async function create(user) {
  try {
    const result = await db('users')
      .insert(user)
      .returning('*');
    return result[0];
  } catch (err) {
    console.log(err);
  }
}

async function readBySlackId(slack_mem_id) {
  try {
    const result = await db('users')
      .where({ slack_mem_id })
      .first();
    return result;
  } catch (err) {
    console.log(err);
  }
}

async function readById(id) {
  try {
    const result = await db('users')
      .where({ id })
      .first();
    return result;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  create,
  readBySlackId,
  readById,
};
