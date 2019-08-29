exports.up = function(knex) {
  return knex.schema.table('shoutouts', tbl => {
    tbl.text('organization_id').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.table('shoutouts', tbl => {
    tbl.dropColumns('organization_id');
  });
};
