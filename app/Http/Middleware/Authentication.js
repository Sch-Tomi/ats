'use strict'

class Authentication {

  *
  handle(req, res, next, rank) {

    let forbidden = true;

    if (req.currentUser != null) {
      switch (rank) {
        case 'user':
          if (req.currentUser.attributes.rank >= 1) {
            forbidden = false
            yield next
          }
          break;
        case 'staff':
          if (req.currentUser.attributes.rank >= 2) {
            forbidden = false
            yield next
          }
          break;
        case 'admin':
          if (req.currentUser.attributes.rank >= 3) {
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

module.exports = Authentication
