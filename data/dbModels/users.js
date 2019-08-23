const db = require('../dbConfig');

module.exports = {
  create: function(user) {
    return db('users')
      .insert(user)
      .returning('*');
  },

  readBySlackId: function(slack_mem_id) {
    return db('users')
      .where({ slack_mem_id })
      .first();
  }
}
