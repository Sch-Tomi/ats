'use strict'

const Lucid = use('Lucid')

class Ticket extends Lucid {

	project(){
		return this.belongsTo('App/Model/Project')
	}

	comments(){
		return this.hasMany('App/Model/Comment')
	}

}

module.exports = Ticket
