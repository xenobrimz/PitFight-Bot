const UsersController = require('../controllers/users.controller')


module.exports = app => { 
    app.get('/api/users', UsersController.findAllUsers)
    app.get('/api/users/:_id/', UsersController.findOneUser)
    app.post('/api/users/create/', UsersController.createUser) 
    app.patch('/api/users/:_id/update/', UsersController.updateUser)
    app.delete('/api/users/:_id/delete/', UsersController.deleteUser)
}