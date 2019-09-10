exports.up = function(knex) {
  return knex.schema.table('users', tbl => {
    tbl.integer('wallet');
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', tbl => {
    tbl.dropColumns('wallet');
  });
};
