const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    _id: String,
    coins: Number
})

const User = mongoose.model('Users', UserSchema);

module.exports = User