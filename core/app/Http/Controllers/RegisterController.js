'use strict'

const User = use('App/Model/User')
const Hash = use('Hash')
const Validator = use('Validator')


class RegisterController {

  *
  index(req, res) {
    yield res.sendView('register')
  }

  *
  doRegister(req, res) {

    var registerMessage = {
      success: 'Registration Successful! Now go ahead and login',
      password_mismatch: 'Password doesn\'t match'
    }

    const data = {
      fname: req.input('FirstName'),
      lname: req.input('LastName'),
      nick: req.input('nick'),
      email: req.input('email'),
      pass1: req.input('Password1'),
      pass2: req.input('Password2')
    }

    console.log(data);

    const rules = {
      fname: 'required|alpha|min:3',
      lname: 'required|alpha',
      nick: 'required|min:3',
      email: 'required|email',
      pass1: 'required|same:pass2'
    }

    const validation = yield Validator.validateAll(data, rules)
    if (validation.fails()) {
      yield req
        .withAll()
        .andWith({
          errors: validation.messages()
        })
        .flash()

      res.redirect('/register')
      return
    }

    const user = new User()
    user.firstname = data.fname
    user.lastname = data.lname
    user.username = data.nick
    user.email = data.email
    user.password = yield Hash.make(data.pass1)
    user.rank = 1

    yield user.save()

    yield res.sendView('register', {
      registerMessage: registerMessage.success
    })
  }
}

module.exports = RegisterController
