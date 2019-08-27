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
    tbl.text('channel_name').notNullable();
    tbl.text('channel_id').notNullable();
    tbl.text('access_token').notNullable();
    tbl.timestamp('installation_date').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('organizations');
};
