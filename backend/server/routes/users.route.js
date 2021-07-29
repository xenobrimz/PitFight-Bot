const UsersController = require('../controllers/users.controller')


module.exports = app => { 
    app.get('/api/users', UsersController.findAllUsers)
    app.get('/api/users/:_id/', UsersController.findOneMonster)
    app.post('/api/users/create/', UsersController.createMonster) 
    app.patch('/api/users/:_id/update/', UsersController.updateMonster)
    app.delete('/api/users/:_id/delete/', UsersController.deleteMonster)
}