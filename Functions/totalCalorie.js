
const User = require('../model/user')
const key = ['7e77db1394de44a0a9ec0ce4b2dddfbf', '8e1bc56cf1d84c6b8c510a7560ecded4']

const apiKey = key[getRandomInt(1)]


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