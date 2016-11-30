'use strict'

const Database = use('Database')
const Project = use('App/Model/Project')

class ProfileController {

  *
  show(req, res) {

    const profile_id = req.param('id')


    const comments = yield Database.from('comments').where({
      owner_id: profile_id
    })
    const staffin = yield Database.from('connetions').select('project_id').where(function() {
      this.where('rank', '=', 2)
      this.where('user_id', profile_id)
    })

    let projects = []

    for (const project_id of staffin) {
      const project = yield Project.find(project_id.project_id)
      projects.push(project)
    }

    const tickets = yield Database.from('tickets').where('owner_id', profile_id)

    console.log(projects)

    yield res.sendView('profile', {
      tickets: tickets,
      staffin: projects,
      comments: comments
    })

  }

}

module.exports = ProfileController
