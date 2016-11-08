'use strict'

const Schema = use('Schema')

class CommentsTableSchema extends Schema {

  up () {
    this.create('comments', (table) => {
      table.increments()
      table.integer('owner_id').references('id').inTable('users')
      table.integer('ticket_id').references('id').inTable('tickets')
      table.string('message').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('comments')
  }

}

module.exports = CommentsTableSchema
