
const User = require('../model/user')
const apiKey = 'bff6a9694faf437699c3580ca49ce114'


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