const User = require('../model/user')

exports.editProfile = async(req, res) => {
    const {token} = req.header["token"]
    const {firstName, lastName, gender, height, weight, diet, age} = req.body
    User.findOneAndUpdate({token: token}, {
        firstName,
        lastName,
        gender,
        height,
        weight,
        diet,
        age
    }).then(changes => {
        changes.save()
    })
}

exports.changingDailyCalorieNeed = async(req, res) => {
    const {token} = req.header["token"]
    const{dailyCalorieNeed} = req.body
    User.findOneAndUpdate({token: token}, {
        dailyCalorieNeed
    }).then(change => {
        change.save()
    })
}