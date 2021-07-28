const mongoose = require('mongoose');
const Schema = mongoose.Schema

const DensSchema = new Schema({
    serverId: String,
    monsters:[{ typr: Schema.Types.ObjectId, ref: 'Monsters' }]
})

const Dens = mongoose.model('Dens', DensSchema);

module.exports = Dens