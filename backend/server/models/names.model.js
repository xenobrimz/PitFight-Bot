const mongoose = require('mongoose');
const Schema = mongoose.Schema

const NamesSchema = new Schema({
    names: {
        monsterNames: {
            first: [String],
            middle: [String],
            last: [String]
        },
        skillNames: [String]
    }
})

const Names = mongoose.model('Names', NamesSchema);

module.exports = Names