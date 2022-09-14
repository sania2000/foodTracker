
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
    goal:{},
    dailyCalorie:{},
    token:{},
    customPlate:{},
    diet:{},
    dailyCalorieNeed:{},
    digit:{},
    profilePic:{}
})

module.exports = mongoose.model('User', User)