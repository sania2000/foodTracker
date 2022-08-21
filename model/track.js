const mongoose = require('mongoose')

const Calorie = mongoose.Schema({
    name:{},
    calorie:{}
}) 

module.exports = mongoose.model('Calorie', Calorie)