const User = require('../model/user')

exports.editProfile = async(req, res) => {
    const token = req.headers['token']
    const {firstName, gender, height, weight, diet, age} = req.body
    User.findOneAndUpdate({token: token}, {
        firstName,
        gender,
        height,
        weight,
        diet,
        age
    }).then(changes => {
        changes.save()
        res.status(200).json({
            message:"Saved"
        })
    })
}

exports.changingDailyCalorieNeed = async(req, res) => {
    const token = req.headers['token']
    const{dailyCalorieNeed} = req.body
    User.findOneAndUpdate({token: token}, {
        dailyCalorieNeed
    }).then(change => {
        change.save()
    })
}

exports.getProfile = async (req, res) => {
    const token = req.headers['token']
    User.findOne({token: token}, function(err, user) {
        res.send(user)
    })
}
