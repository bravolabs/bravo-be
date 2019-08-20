exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments()
    tbl
      .text('org_id')
      .notNullable()
      .references('id')
      .inTable('organizations')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    tbl
      .text('slack_mem_id')
      .unique()
      .notNullable()
    tbl.text('email')
    tbl.text('name')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
}
