const mongoose = require('mongoose');
// load monster model first
require('./monsters.model');
const Schema = mongoose.Schema

const DensSchema = new Schema({
    serverId: String,
    monsters:[{ type: Schema.Types.ObjectId, ref: 'Monsters' }]
})

const Dens = mongoose.model('Dens', DensSchema);

module.exports = Dens