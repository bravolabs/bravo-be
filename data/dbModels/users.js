const db = require('../dbConfig');

module.exports = {
  create: function(user) {
    return db('users')
      .insert(user)
      .returning('*');
  }
}
