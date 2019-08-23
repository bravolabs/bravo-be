const db = require('../dbConfig');

module.exports = {
  create: function(shoutout) {
    return db('shoutouts')
      .insert(shoutout)
      .returning('*');
  },

  read: function(receiver_id) {
    return db('shoutouts')
      .where({ receiver_id });
  }
}
