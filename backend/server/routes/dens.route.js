const DensController = require('../controllers/Dens.controller')


module.exports = app => { 
    app.get('/api/dens', DensController.findAllDens)
    app.get('/api/dens/:_id/', DensController.findOneDen)
    app.post('/api/dens/create/', DensController.createDen) 
    app.patch('/api/dens/:_id/update/', DensController.updateDen)
    app.delete('/api/dens/:_id/delete/', DensController.deleteDen)
}