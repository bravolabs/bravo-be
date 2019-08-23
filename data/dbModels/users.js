const db = require('../dbConfig');

function create(user) {
  return db('users')
    .insert(user)
    .returning('*');
}

function readBySlackId(slack_mem_id) {
  return db('users')
    .where({ slack_mem_id })
    .first();
}

module.exports = {
  create,
  readBySlackId
}
