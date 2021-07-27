const monsters = require('../models/monsters.model');

module.exports.findAllMonsters = (req, res) =>{
    console.log('Calling all monsters!!!')
    monsters.find({}) 
        .then(monsters => res.json({results: monsters}))
        .catch(err => res.json({message: 'uh-oh something went wrong', error: err})) 
}


module.exports.findOneMonster = (req, res) =>{
    console.log('Calling Monster!!!')
    monsters.find({_id: req.params._id}) 
        .then(monster => res.json({results: monster}))
        .catch(err => res.json({message: 'uh-oh something went wrong', error: err})) 
}

module.exports.createMonster = (req, res) =>{
    console.log('Creating Monster!!!')
    monsters.create(req.body) 
        .then(newMonster => res.json({result: newMonster}))
        .catch(err => res.json({message: 'uh-oh something went wrong', error: err}))
}

module.exports.updateMonster = (req, res) =>{
    console.log('Updating Monster!!!')
    monsters.findOneAndUpdate(
        {_id: req.params._id}, 
        req.body, 
        {new: true, runValidators: true}
    )
       .then(updatedMonster => res.json({result: updatedMonster}))
       .catch(err => res.json({message: 'uh-oh something went wrong', error: err})) 
}
    

module.exports.deleteMonster = (req, res) =>{
    console.log('Deleting Monster!!!')
    monsters.deleteOne({ _id: req.params._id }) 
        .then( result => res.json({ result: result }) )
        .catch( err => res.json({message: 'uh-oh something went wrong', error: err}) ) 
}