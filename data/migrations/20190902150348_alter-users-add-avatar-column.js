exports.up = function(knex) {
  return knex.schema.table('users', tbl => {
    tbl.text('avatar');
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', tbl => {
    tbl.dropColumns('avatar');
  });
};
