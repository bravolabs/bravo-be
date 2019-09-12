exports.up = function(knex) {
  return knex.schema.table('organizations', tbl => {
    tbl.text('bot_access_token').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.table('organizations', tbl => {
    tbl.dropColumns('bot_access_token');
  });
};
