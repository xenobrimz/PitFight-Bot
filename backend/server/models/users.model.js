const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName: String,
    discordId: String,
    coins: Number
})

const User = mongoose.model('Users', UserSchema);

module.exports = User