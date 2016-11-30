'use strict'

const Schema = use('Schema')

class TicketsTableSchema extends Schema {

  up() {
    this.create('tickets', (table) => {
      table.increments()
      table.integer('owner_id').references('id').inTable('users')
      table.integer('assigned_id').references('id').inTable('users')
      table.integer('project_id').references('id').inTable('projects')
      table.string('name').notNullable()
      table.string('desc').notNullable()
      table.integer('status').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('tickets')
  }

}

module.exports = TicketsTableSchema
