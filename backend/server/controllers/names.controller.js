const names = require('../models/names.model');

module.exports.findAllNames = (req, res) =>{
    console.log('Calling all Names!!!')
    names.find({}) 
        .then(names => res.json({results: names}))
        .catch(err => res.json({message: 'uh-oh something went wrong', error: err})) 
}

module.exports.findOneName = (req, res) =>{
    console.log('Calling Name!!!')
    names.findOne({_id: req.params._id}) 
        .then(Name => res.json({result: Name}))
        .catch(err => res.json({message: 'uh-oh something went wrong', error: err})) 
}

module.exports.createName = (req, res) =>{
    console.log('Creating Name!!!')
    names.create(req.body) 
        .then(newName => res.json({result: newName}))
        .catch(err => res.json({message: 'uh-oh something went wrong', error: err}))
}

module.exports.updateName = (req, res) =>{
    console.log('Updating Name!!!')
    names.findOneAndUpdate(
        {_id: req.params._id}, 
        req.body, 
        {new: true, runValidators: true}
    )
       .then(updatedName => res.json({result: updatedName}))
       .catch(err => res.json({message: 'uh-oh something went wrong', error: err})) 
}
    

module.exports.deleteName = (req, res) =>{
    console.log('Deleting Name!!!')
    names.deleteOne({ _id: req.params._id }) 
        .then( result => res.json({ result: result }) )
        .catch( err => res.json({message: 'uh-oh something went wrong', error: err}) ) 
}