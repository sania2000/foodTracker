
const mongoose = require('mongoose')


const Plate = mongoose.Schema({
    name:{},
    ingredients:{},
    totalCalorie:{},
    token:{}
})

module.exports = mongoose.model('Plate', Plate)