exports.up = function(knex) {
  return knex.schema.table('shoutouts', tbl => {
    tbl.text('message_ts');
  });
};

exports.down = function(knex) {
  return knex.schema.table('shoutouts', tbl => {
    tbl.dropColumns('message_ts');
  });
};
