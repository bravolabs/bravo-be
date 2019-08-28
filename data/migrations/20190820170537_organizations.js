exports.up = function(knex) {
  return knex.schema.createTable('organizations', tbl => {
    tbl.increments();
    tbl
      .text('slack_org_id')
      .unique()
      .notNullable();
    tbl
      .text('name')
      .unique()
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('organizations');
};
