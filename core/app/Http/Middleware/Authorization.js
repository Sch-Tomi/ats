'use strict'

const Database = use('Database')
const Ticket = use('App/Model/Ticket')

class Authorization {

  *
  handle(req, res, next, rank) {

    let forbidden = true;

    if (req.currentUser != null) {

      let pro_id = req.param('id')

      if(req.url().indexOf('ticket') !== -1){
        const ticket = yield Ticket.find(pro_id)
        pro_id = ticket.project_id
      }

      let user_rank = yield Database.from('connetions').select('rank').where({
        user_id: req.currentUser.attributes.id,
        project_id: pro_id
      })

      user_rank = (user_rank.length != 0) ? (user_rank[0].rank) : (1)

      switch (rank) {
        case 'user':
          if (user_rank >= 1) {
            forbidden = false
            yield next
          }
          break;
        case 'staff':
          if (user_rank >= 2) {
            forbidden = false
            yield next
          }
          break;
        case 'admin':
          if (user_rank >= 3) {
            forbidden = false
            yield next
          }
          break;
      }
    }

    if (forbidden) {
      res.forbidden('Sorry, you don\'t have right to see this page.')
      return
    }



  }

}

module.exports = Authorization
