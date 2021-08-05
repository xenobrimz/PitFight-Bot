const mongoose = require('mongoose')

const MonsterSchema = new mongoose.Schema({
    name: String,
    health: Number,
    defense: Number,
    skills:[
        // Make skill number the index of the skill of the array + 1
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