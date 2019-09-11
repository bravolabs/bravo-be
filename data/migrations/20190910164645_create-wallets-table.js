exports.up = function(knex) {
  return knex.schema.createTable('wallets', tbl => {
    tbl.increments();
    tbl
      .integer('user_id')
      .notNullable()
      .unique()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('amount')
      .notNullable()
      .defaultTo(0);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('wallets');
};
