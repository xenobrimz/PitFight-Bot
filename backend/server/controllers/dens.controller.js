const dens = require('../models/dens.model');

module.exports.findAllDens = (req, res) =>{
    console.log('Calling all dens!!!')
    dens.find({}) 
        .then(dens => res.json({results: dens}))
        .catch(err => res.json({message: 'uh-oh something went wrong', error: err})) 
}


module.exports.findOneDen = (req, res) =>{
    console.log('Calling Den!!!')
    dens.find({_id: req.params._id}) 
        .then(Den => res.json({results: Den}))
        .catch(err => res.json({message: 'uh-oh something went wrong', error: err})) 
}

module.exports.createDen = (req, res) =>{
    console.log('Creating Den!!!')
    dens.create(req.body) 
        .then(newDen => res.json({result: newDen}))
        .catch(err => res.json({message: 'uh-oh something went wrong', error: err}))
}

module.exports.updateDen = (req, res) =>{
    console.log('Updating Den!!!')
    dens.findOneAndUpdate(
        {_id: req.params._id}, 
        req.body, 
        {new: true, runValidators: true}
    )
       .then(updatedDen => res.json({result: updatedDen}))
       .catch(err => res.json({message: 'uh-oh something went wrong', error: err})) 
}
    

module.exports.deleteDen = (req, res) =>{
    console.log('Deleting Den!!!')
    dens.deleteOne({ _id: req.params._id }) 
        .then( result => res.json({ result: result }) )
        .catch( err => res.json({message: 'uh-oh something went wrong', error: err}) ) 
}