const db = require('../dbConfig');

function create(shoutout) {
  return db('shoutouts')
    .insert(shoutout)
    .returning('*');
}

function read(receiver_id) {
  return db('shoutouts')
    .where({ receiver_id });
}

module.exports = {
  create,
  read
}
