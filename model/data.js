const mongoose = require('mongoose')

const Data = mongoose.Schema({
    name:{},
    nutrients:{},
    amount:{}
}) 

module.exports = mongoose.model('Data', Data)