const NamesController = require('../controllers/names.controller')


module.exports = app => { 
    app.get('/api/names', NamesController.findAllNames)
    app.get('/api/names/:_id/', Names.findOneDen)
    app.post('/api/names/create/', Names.createDen) 
    app.patch('/api/names/:_id/update/', Names.updateDen)
    app.delete('/api/names/:_id/delete/', Names.deleteDen)
}