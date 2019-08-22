exports.up = function(knex) {
  return knex.schema.createTable('shoutouts', tbl => {
    tbl.increments()
    tbl
      .integer('giver_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    tbl
      .integer('receiver_id')
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
