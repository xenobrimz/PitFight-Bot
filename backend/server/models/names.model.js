const mongoose = require('mongoose');
const Schema = mongoose.Schema

const NamesSchema = new Schema({
    _id: String,
    names:{
        monsterNames:[
            {
                first:[    
                ],
                middle:[
                ],
                last:[
                ]
            }
        ],

        skillNames:[
        ]   
    }      
})

const Names = mongoose.model('Names', NamesSchema);

module.exports = Names