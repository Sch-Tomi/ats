'use strict'


const Validator = use('Validator')
const Comment = use('App/Model/Comment')

class CommentController {

  *
  add(req, res) {

    const data = {
      message: req.input('message')
    }

    const rules = {
      message: 'required'
    }

    const validation = yield Validator.validateAll(data, rules)
    if (validation.fails()) {
      yield req
        .withAll()
        .andWith({
          comment_errors: validation.messages()
        })
        .flash()

      res.redirect('/create/ticket/' + req.input('ticket_id'))
      return
    }

    const comment = new Comment()
    comment.owner_id = req.currentUser.attributes.id,
      comment.ticket_id = req.input('ticket_id')
    comment.message = data.message

    yield comment.save()

    yield res.redirect('/ticket/' + req.input('ticket_id'))

  }

}

module.exports = CommentController
