'use strict'

const Lucid = use('Lucid')

class Project extends Lucid {

  tickets() {
    return this.hasMany('App/Model/Ticket')
  }

}

module.exports = Project
