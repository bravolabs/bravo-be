const db = require('../dbConfig');

module.exports = {
  create: function(organization) {
    return db.raw('INSERT INTO organizations (slack_org_id, name) VALUES (?, ?) ON CONFLICT (slack_org_id) DO UPDATE SET name = EXCLUDED.name RETURNING *', [ 
      organization.slack_org_id,
      organization.name
    ])
    .then(data => data.rows);
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
  },

  delete: function(id) {
    return db('organizations')
      .delete()
      .where({ id })
      .returning('*');
  }
}
