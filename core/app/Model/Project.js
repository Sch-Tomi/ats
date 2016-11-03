'use strict'

const Lucid = use('Lucid')

class Projects extends Lucid {

	tickets(){
		return this.hasMany('App/Model/Ticket')
	}

}

module.exports = Projects
