'use strict'

const Database = use('Database')
const Validator = use('Validator')
const Ticket = use('App/Model/Ticket')
const User = use('App/Model/User')
const Connetion = use('App/Model/Connetion')

class TicketController {

	* create(req,res){
		let id = req.param('id')
		//console.log('ID::::'+id)
		yield res.sendView('createTicket', {p_id:id})

	}

	* doCreate(req,res){
		const data = {
			name:req.input('ticketName'),
			desc:req.input('desc')
		}

		const rules = {
			name:'required|min:5',
			desc:'required|min:50'
		}

		const validation = yield Validator.validateAll(data, rules)
		if(validation.fails()){
				yield req
						.withAll()
						.andWith({ errors: validation.messages(), p_id:req.param('id')})
						.flash()

				res.redirect('/create/ticket/'+req.param('id'))
				return
		}

		const ticket = new Ticket()
		ticket.name = data.name,
		ticket.desc = data.desc,
		ticket.owner_id = req.currentUser.attributes.id,
		ticket.assigned_id = 1
		ticket.project_id = req.param('id')
		ticket.status = 1

		yield ticket.save()

		yield res.redirect('/ticket/'+ticket.id)


	}

	* show(req,res){
		const ticket = yield Ticket.find(req.param('id'))



		const comments = yield ticket.comments().fetch()

		for(const comment of comments){
			//const owner = yield comment.user().fetch()
			//const owner = yield Database.from('users').where('id',comment.owner_id).limit(1)
			const owner = yield User.find(comment.owner_id)
			console.log(owner)
			comment.owner = owner.toJSON()
			const rank = yield Database.from('connetions').select('rank').where({ user_id:comment.owner_id, project_id:ticket.project_id })
			console.log(rank.length )
			comment.user_rank = (rank.length != 0) ? (rank[0].rank) : (1)
			//yield comment.related('user').load()
		}

		const logged = (req.currentUser != null) ? true : false

		console.log(comments.toJSON())

		yield res.sendView('ticket', {
							ticket:ticket.toJSON(),
							logged:logged,
							comments: comments.toJSON()
						})


	}



}

module.exports = TicketController
