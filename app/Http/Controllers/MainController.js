'use strict'

const Project = use('App/Model/Project')

class MainController {


  *
  index(req, res) {
    //console.log(req.currentUser)

    const projects = yield Project.all()

    const admin = (req.currentUser != null) ? req.currentUser.attributes.rank == 3 : false
      //console.log(projects.toJSON())

    yield res.sendView('main', {
      projects: projects.toJSON(),
      admin: admin
    })

  }
}

module.exports = MainController
