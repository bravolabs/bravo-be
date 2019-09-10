exports.up = function(knex) {
  return knex.schema.createTable('actions', tbl => {
    tbl.increments();
    tbl
      .integer('reward')
      .notNullable()
      .defaultTo(1);
    tbl.text('name').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('actions');
};
