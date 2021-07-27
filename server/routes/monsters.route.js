const MonstersController = require('../controllers/monsters.controller')


module.exports = app => { 
    app.get('/api/monsters', MonstersController.findAllMonsters)
    app.get('/api/monsters/:_id/', MonstersController.findOneMonster)
    app.post('/api/monsters/create/', MonstersController.createMonster) 
    app.patch('/api/monsters/:_id/update/', MonstersController.updateMonster)
    app.delete('/api/monsters/:_id/delete/', MonstersController.deleteMonster)
}