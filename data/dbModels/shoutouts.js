const db = require('../dbConfig');

module.exports = {
  create: function(shoutout) {
    return db('shoutouts')
      .insert(shoutout)
      .returning('*');
  },

  read: function(receive_id) {
    return db('shoutouts')
      .where({ receive_id });
  }
}
