'use strict'

const Lucid = use('Lucid')

class Connetion extends Lucid {

	user(){
		return this.belongsTo('App/Model/User')
	}

	project(){
		return this.belongsTo('App/Model/Project')
	}

}

module.exports = Connetion
