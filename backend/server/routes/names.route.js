const NamesController = require('../controllers/names.controller')


module.exports = app => { 
    app.get('/api/names', NamesController.findAllNames)
    app.get('/api/names/:_id/', NamesController.findOneName)
    app.post('/api/names/create/', NamesController.createName) 
    app.patch('/api/names/:_id/update/', NamesController.updateName)
    app.delete('/api/names/:_id/delete/', NamesController.deleteName)
}