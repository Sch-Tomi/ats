'use strict'

const Validator = use('Validator')
const Project = use('App/Model/Project')
const Connetion = use('App/Model/Connetion')

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

			 //console.log(tickets.toJSON())

			 yield res.sendView("project", {
				 project:project.toJSON(),
				 tickets:tickets.toJSON()
			 })

		}
}

module.exports = ProjectController
