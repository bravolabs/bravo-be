exports.up = function(knex) {
  return knex.schema.table('users', tbl => {
    tbl
      .integer('wallet')
      .notNullable()
      .defaultTo(0);
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', tbl => {
    tbl.dropColumns('wallet');
  });
};
