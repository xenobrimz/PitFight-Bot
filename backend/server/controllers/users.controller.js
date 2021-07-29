const users = require('../models/users.model');

module.exports.findAllUsers = (req, res) =>{
    console.log('Calling all users!!!')
    users.find({}) 
        .then(users => res.json({results: users}))
        .catch(err => res.json({message: 'uh-oh something went wrong', error: err})) 
}


module.exports.findOneUser = (req, res) =>{
    console.log('Calling Users!!!')
    users.find({_id: req.params._id}) 
        .then(monster => res.json({results: monster}))
        .catch(err => res.json({message: 'uh-oh something went wrong', error: err})) 
}

module.exports.createUser = (req, res) =>{
    console.log('Creating User!!!')
    users.create(req.body) 
        .then(newMonster => res.json({result: newMonster}))
        .catch(err => res.json({message: 'uh-oh something went wrong', error: err}))
}

module.exports.updateUser = (req, res) =>{
    console.log('Updating User!!!')
    users.findOneAndUpdate(
        {_id: req.params._id}, 
        req.body, 
        {new: true, runValidators: true}
    )
       .then(updatedMonster => res.json({result: updatedMonster}))
       .catch(err => res.json({message: 'uh-oh something went wrong', error: err})) 
}
    

module.exports.deleteUser = (req, res) =>{
    console.log('Deleting User!!!')
    users.deleteOne({ _id: req.params._id }) 
        .then( result => res.json({ result: result }) )
        .catch( err => res.json({message: 'uh-oh something went wrong', error: err}) ) 
}