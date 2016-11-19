'use strict'

const Schema = use('Schema')

class ConnetionsTableSchema extends Schema {

  up() {
    this.create('connetions', (table) => {
      table.increments()
      table.integer('user_id').references('id').inTable('users')
      table.integer('project_id').references('id').inTable('projects')
      table.integer('rank').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('connetions')
  }

}

module.exports = ConnetionsTableSchema
