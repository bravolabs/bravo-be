const db = require('../dbConfig');

module.exports = {
  create: function(shoutout) {
    return db('shoutouts')
      .insert(shoutout)
      .returning('*');
  }
}
