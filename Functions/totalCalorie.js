
const User = require('../model/user')
const apiKey = '069c7142c3f44e45b8702ba040e9032f'


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