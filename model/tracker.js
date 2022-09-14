const mongoose = require('mongoose')

const Tracker = mongoose.Schema({
    email:{},
    date:{},
    nutrition:{}
}) 

module.exports = mongoose.model('Tracker', Tracker)