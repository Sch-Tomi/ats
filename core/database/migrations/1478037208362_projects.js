'use strict'

const Schema = use('Schema')

class ProjectsTableSchema extends Schema {

  up() {
    this.create('projects', (table) => {
      table.increments()
      table.string('name', 50).notNullable()
      table.string('desc', 500).notNullable()
      table.integer('owner_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down() {
    this.drop('projects')
  }

}

module.exports = ProjectsTableSchema
