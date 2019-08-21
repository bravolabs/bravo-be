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
  }
}
