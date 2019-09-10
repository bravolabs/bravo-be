exports.up = function(knex) {
  return knex.schema.createTable('transactions', tbl => {
    tbl.increments();
    tbl
      .integer('org_id')
      .notNullable()
      .references('id')
      .inTable('organizations')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('giver_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('receiver_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('action_id')
      .notNullable()
      .references('id')
      .inTable('actions')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('transactions');
};
