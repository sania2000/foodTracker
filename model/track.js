const mongoose = require('mongoose')

const Calorie = mongoose.Schema({
    name:{},
    nutrition:{}
}) 

module.exports = mongoose.model('Calorie', Calorie)