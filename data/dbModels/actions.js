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

async function update(id, changes) {
  const result = await db('actions')
    .update(changes, '*')
    .where({ id });
  return result[0];
}

async function remove(id) {
  const result = await db('actions')
    .delete()
    .where({ id })
    .returning('*');
  return result[0];
}

module.exports = {
  create,
  readById,
  readByName,
  update,
  remove,
};
