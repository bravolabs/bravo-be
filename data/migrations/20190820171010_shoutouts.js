exports.up = function(knex) {
  return knex.schema.createTable('shoutouts', tbl => {
    tbl.increments()
    tbl
      .text('giver_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    tbl
      .text('receiver_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    tbl.text('message').notNullable()
    tbl.timestamps(false, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('shoutouts')
}
