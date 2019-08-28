exports.up = function(knex) {
  return knex.schema.table('organizations', tbl => {
    tbl.text('channel_name').notNullable();
    tbl.text('channel_id').notNullable();
    tbl.text('access_token').notNullable();
    tbl.timestamp('installation_date').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {};
