const mongoose = require('mongoose')

const MonsterSchema = new mongoose.Schema({
    name: String,
    health: Number,
    defense: Number,
    skills:[
        {
            skillNumber:Number,
            name: String,
            damage: Number,
            type: String
        },
        {
            skillNumber:Number,
            name: String,
            damage: Number,
            type: String
        },
        {
            skillNumber:Number,
            name: String,
            damage: Number,
            type: String
        }
    ],  
    wins:Number,
    losses:Number
},
{typeKey: '$type'}
);

const Monster = mongoose.model('Monsters', MonsterSchema);

module.exports = Monster