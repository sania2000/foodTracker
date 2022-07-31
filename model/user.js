
const mongoose = require('mongoose')


const User = mongoose.Schema({
    name:{},
    username:{},
    firstname:{},
    lastname:{},
    email:{},
    password:{},
    gender:{},
    age:{},
    weight:{},
    height:{},
    activity:{},
    BMI:{},
    dailyCalorie:{},
    token:{},
    customPlate:{},
    diet:{},
    dailyCalorieNeed:{}
})

module.exports = mongoose.model('User', User)