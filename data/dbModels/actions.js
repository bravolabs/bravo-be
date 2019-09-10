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
    const result = await db('actions')
      .where({ id })
      .first();
    return result;
  } catch (err) {
    console.log(err);
  }
}

async function readByName(name) {
  try {
    const result = await db('actions')
      .where({ name })
      .first();
    return result;
  } catch (err) {
    console.log(err);
  }
}

function update(id, changes) {
  return db('actions')
    .update(changes, '*')
    .where({ id })
    .first();
}

function remove(id) {
  return db('actions')
    .delete()
    .where({ id })
    .returning('*')
    .first();
}

module.exports = {
  create,
  readById,
  readByName,
  update,
  remove,
};
