
const User = require('../model/user')
apiKey = '5a7d5e15a2db4b15b3b2ed318b1c9f19'


exports.totalCalorie = async (req, res) => {
    const {date,nutrition} = req.body
    const token = req.headers['token']
    try{User.findOneAndUpdate({token: token}, {
        dailyCalorie: {
            date:date,
            nutrition: nutrition
        }
    }).then(user => {
        user.save()
        res.sendStatus(200)
    })} catch(error){
        res.sendStatus(400)
    }
}


exports.getDiary = async(req, res) => {
    const {token} = req.headers['token']
    User.find({token: token}, function(err, doc){
        res.send(doc)
    })
}