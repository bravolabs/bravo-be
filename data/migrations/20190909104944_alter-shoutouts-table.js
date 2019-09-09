exports.up = function (knex) {
  return knex.schema.table('shoutouts', tbl => {
    tbl.text('timestamp');
  });
};

exports.down = function (knex) {
  return knex.schema.table('shoutouts', tbl => {
    tbl.dropColumns('timestamp');
  });
};
