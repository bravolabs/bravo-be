exports.up = function(knex) {
  return knex.schema.table('organizations', tbl => {
    tbl.text('channel_name').notNullable();
    tbl.text('channel_id').notNullable();
    tbl.text('access_token').notNullable();
    tbl.timestamp('installation_date').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.table('organizations', tbl => {
    tbl.dropColumns('channel_name');
    tbl.dropColumns('channel_id');
    tbl.dropColumns('access_token');
    tbl.dropColumns('installation_date');
  });
};
