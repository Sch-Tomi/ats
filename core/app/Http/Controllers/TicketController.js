'use strict'

const Database = use('Database')
const Validator = use('Validator')
const Ticket = use('App/Model/Ticket')
const User = use('App/Model/User')
const Connetion = use('App/Model/Connetion')
const Project = use('App/Model/Project')

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

		const project = yield Project.find(req.param('id'))
		const assigned = yield User.find(project.owner_id)

		const ticket = new Ticket()
		ticket.name = data.name,
		ticket.desc = data.desc,
		ticket.owner_id = req.currentUser.attributes.id,
		ticket.assigned_id = assigned.id
		ticket.project_id = req.param('id')
		ticket.status = 1

		yield ticket.save()

		yield res.redirect('/ticket/'+ticket.id)


	}

	* show(req,res){
		const ticket = yield Ticket.find(req.param('id'))
		ticket.owner = yield User.find(ticket.owner_id)
		ticket.assigned = yield User.find(ticket.assigned_id)
		// TODO: PROJECT.... :@
		const project = yield Project.find(ticket.project_id)
		ticket.project = project.name
		//console.log(project.name);
		const comments = yield ticket.comments().fetch()

		for(const comment of comments){
			//const owner = yield comment.user().fetch()
			//const owner = yield Database.from('users').where('id',comment.owner_id).limit(1)
			const owner = yield User.find(comment.owner_id)
			//console.log(owner)
			comment.owner = owner.toJSON()
			const rank = yield Database.from('connetions').select('rank').where({ user_id:comment.owner_id, project_id:ticket.project_id })
			//console.log(rank.length )
			comment.user_rank = (rank.length != 0) ? (rank[0].rank) : (1)
			//yield comment.related('user').load()
		}

		const logged = (req.currentUser != null) ? true : false
		let staff_or_admin =  false
		if(logged){
				let rank = yield Database.from('connetions').select('rank').where({ user_id:req.currentUser.attributes.id, project_id:ticket.project_id })
				rank = (rank.length != 0) ? (rank[0].rank) : (1)
				if( rank != 1 ) {
						staff_or_admin = true
				}
		}


		console.log(staff_or_admin)

		yield res.sendView('ticket', {
							ticket:ticket.toJSON(),
							logged:logged,
							comments: comments.toJSON(),
							staff:staff_or_admin
						})


	}


	* update(req,res){

		const ticket = yield Ticket.find(req.param('id'))

		const staffs_raw = yield Database.from('connetions').select('user_id').where(function () {
  		this.where('project_id', ticket.project_id)
			this.where('rank', '>', 1)
		})

		let staffs = []

		for(const staff of staffs_raw){
			//console.log(staff)
			const user = yield User.find(staff.user_id)
			staffs.push(user)
		}

		const status = [{val:1, desc:"NEW"},{val:2, desc:"Working"},{val:3, desc:"Waiting for more information"},{val:4, desc:"Fixed"},{val:5, desc:"On-Hold"},{val:6, desc:"Deleted"}]

		yield res.sendView('ticketUpdate',{
					ticket: ticket,
					staffs: staffs,
					status: status
		})

	}



}

module.exports = TicketController
