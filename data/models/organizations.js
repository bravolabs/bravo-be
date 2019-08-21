const db = require('../dbConfig');

module.exports = {
  create: function(organization) {
    return db('organizations')
      .insert(organization)
      .whereNotExists(function() {
        this.select('*')
          .from('organizations')
          .whereRaw('slack_org_id = ? OR name = ?', [ 
            organization.slack_org_id,
            organization.name
          ]);
      })
      .returning('*');
  },

  read: function(slack_org_id = null) {
    if(slack_org_id) {
      return db('organizations')
        .where({ slack_org_id })
        .first();
    }
    return db('organizations');
  },

  update: function(id, changes) {
    return db('organizations')
      .update(changes, '*')
      .where({ id });
  }
}
