const mongoose = require('mongoose')


const MonsterSchema = new mongoose.Schema({
    name: String,
    health: Number,
    defence: Number,
    skills:{
        skill1:{
            name: String,
            damage: Number,
            type: String
        },
        skill2:{
            name: String,
            damage: Number,
            type: String
        }, 
        skill3:{
            name: String,
            damage: Number,
            type: String
        },  
      
    },

})

const Monster = mongoose.model('Monsters', MonsterSchema);

module.exports = Monster