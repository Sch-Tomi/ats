'use strict'

const Validator = use('Validator')
const Project = use('App/Model/Project')
const Connetion = use('App/Model/Connetion')
const User = use('App/Model/User')
const Database = use('Database')

class ProjectController {


		* create(req,res){

			yield res.sendView('createProject')

		}

		* doCreate(req,res){

			const data = {
					name:req.input('projectName'),
					desc:req.input('desc')
			}

			const rules = {
				name: 'required|min:3'
			}

			const validation = yield Validator.validateAll(data, rules)
			if(validation.fails()){
					yield req
							.withAll()
							.andWith({ errors: validation.messages() })
							.flash()

					res.redirect('/create/project')
					return
			}

			const project = new Project()
			project.name = data.name,
			project.desc = data.desc,
			project.owner_id = req.currentUser.attributes.id

			yield project.save()

			const connetion = new Connetion()
			connetion.user_id = req.currentUser.attributes.id
			connetion.project_id = project.id
			connetion.rank = 3

			yield connetion.save()

			yield res.redirect('/project/'+project.id)
		}


		* show(req,res){

			 const project = yield Project.find(req.param('id'))

			 const tickets = yield project.tickets().fetch()

			 let owner = false
			 let logged_in = false

			 const owner_data = yield User.find(project.owner_id)

			 if (req.currentUser != null) {
			 		owner = (project.owner_id == req.currentUser.attributes.id) ? true : false
					logged_in = true
			 }

			const staffs_id = yield Database.from('connetions').select('user_id').where(function(){
 				this.where('project_id', req.param('id'))
 				this.where('rank','=', '2')
 			})

 			let staffs = []
 			let staffs_ids_arr = [project.owner_id]

 			for(const staff of staffs_id){
 				staffs_ids_arr.push(staff.user_id)
 				staffs.push(yield User.find(staff.user_id))
 			}



			 console.log(owner_data)

			 yield res.sendView("project", {
				 project:project.toJSON(),
				 tickets:tickets.toJSON(),
				 owner: owner,
				 logged_in: logged_in,
				 owner_data: owner_data,
				 staffs:staffs

			 })

		}


		* update(req, res){

			const project = yield Project.find(req.param('id'))

			const staffs_id = yield Database.from('connetions').select('user_id').where(function(){
				this.where('project_id', req.param('id'))
				this.where('rank','=', '2')
			})

			let staffs = []
			let staffs_ids_arr = [project.owner_id]

			for(const staff of staffs_id){
				staffs_ids_arr.push(staff.user_id)
				staffs.push(yield User.find(staff.user_id))
			}

			const users = yield Database.from('users').whereNotIn('id', staffs_ids_arr);

			yield res.sendView("projectUpdate",{
				project: project,
				staffs:staffs,
				users:users
			})
		}

		* doUpdate(req, res){

			const data = {
				name:req.input('name'),
				desc:req.input('desc'),
			}

			const rules = {
				name:'required',
				desc:'required'
			}

			const validation = yield Validator.validateAll(data, rules)
			if(validation.fails()){
					yield req
							.withAll()
							.andWith({ errors: validation.messages()})
							.flash()

					res.redirect('/update/project/'+req.param('id'))
					return
			}

			const project = yield Project.find(req.param('id'))
			project.name = data.name
			project.desc = data.desc

			yield project.save()

			res.redirect('/project/'+req.param('id'))


		}

		* addStaff(req, res){

			const connetion = new Connetion()
			connetion.user_id = req.input('newuser')
			connetion.project_id = req.param('id')
			connetion.rank = 2

			yield connetion.save()

			res.redirect('/project/'+req.param('id'))
		}

		* deleteStaff(req, res){
			const connetion = yield Connetion.query().where(function(){
					this.where('user_id', '=', req.input('staff')),
					this.where('project_id', '=', req.param('id'))
					this.where('rank', '=', 2)
			}).first()

			yield connetion.delete()

			res.redirect('/project/'+req.param('id'))
		}

}

module.exports = ProjectController
