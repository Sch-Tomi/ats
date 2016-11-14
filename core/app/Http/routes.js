'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.get('/', 'MainController.index')

Route.get('/register', 'RegisterController.index')
Route.post('/register', 'RegisterController.doRegister')


Route.get('/login', 'LoginController.login')
Route.post('/login', 'LoginController.doLogin')

Route.post('/logout', 'LoginController.logout')

Route.get('/create/project', 'ProjectController.create').middleware('auth:admin')
Route.post('/create/project', 'ProjectController.doCreate').middleware('auth:admin')

Route.get('/project/:id', 'ProjectController.show')

Route.get('/create/ticket/:id', 'TicketController.create').middleware('auth:user')
Route.post('/create/ticket/:id', 'TicketController.doCreate').middleware('auth:user')

Route.get('/ticket/:id', 'TicketController.show')

Route.post('/comment/add', 'CommentController.add').middleware('auth:user')

Route.get('/update/ticket/:id', 'TicketController.update').middleware('author:staff')
Route.post('/update/ticket/:id', 'TicketController.doUpdate').middleware('author:staff')

Route.get('/update/project/:id', 'ProjectController.update').middleware('author:admin')
Route.post('/update/project/:id', 'ProjectController.doUpdate').middleware('author:admin')

Route.get('/profile/:id', 'ProfileController.show')
