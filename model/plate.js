
const mongoose = require('mongoose')


const Plate = mongoose.Schema({
    name:{},
    ingredients:{},
    totalCalorie:{},
    email:{},
    platePic:{}
})

module.exports = mongoose.model('Plate', Plate)