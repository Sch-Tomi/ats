'use strict'

const Project = use('App/Model/Project')

class MainController {


    * index(req, res){
        //console.log(req.currentUser)

        const projects = yield Project.all()

        //console.log(projects.toJSON())

        yield res.sendView('main',{projects:projects.toJSON()})

    }
}

module.exports = MainController
