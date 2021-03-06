'use strict'

const User = use('App/Model/User')
const Hash = use('Hash')

class LoginController {

  *
  login(req, res) {
    yield res.sendView('login')
  }

  *
  doLogin(req, res) {
    const email = req.input('email')
    const password = req.input('password')

    const loginMessage = {
      success: 'Logged-in Successfully!',
      error: 'Invalid Credentials'
    }

    // Attempt to login with email and password
    const authCheck = yield req.auth.attempt(email, password)

    if (authCheck) {
      return res.redirect('/')
    }


    yield req
      .andWith({
        error: loginMessage.error,
        email: email
      })
      .flash()

    res.redirect('/register')
    return

  }

  * ajaxLogin (req, res) {
        // 1.
        const email = req.input('email')
        const password = req.input('password')

        // 3.
        try {
            yield req.auth.attempt(email, password)
            res.ok({ success: true })
        } catch (ex) {
            res.ok({ success: false })
        }
    }


  *
  logout(request, response) {
    yield request.auth.logout()

    return response.redirect('/')
  }

}

module.exports = LoginController
