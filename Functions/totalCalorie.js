
const User = require('../model/user')
const Tracker = require('../model/tracker')
const key = ['7e77db1394de44a0a9ec0ce4b2dddfbf', '8e1bc56cf1d84c6b8c510a7560ecded4']
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const apiKey = key[getRandomInt(1)]


exports.totalCalorie = async (req, res) => {
    const {date,nutrition} = req.body
    const token = req.headers['token']
    try{
        User.find({token: token}, function (err, user){
            console.log(user[0].email)
            Tracker.create({
                email: user[0].email,
                date,
                nutrition
            }).then(track => {
                track.save();
                res.json({
                    message: "Saved"
                })
            })
        })
    } catch(error){
        res.sendStatus(400)
    }
}


exports.getDiary = async(req, res) => {
    const token = req.headers['token']
    User.findOne({token: token}, function(err, user) {
        Tracker.find({email: user.email}, function(err, doc) {
            if(doc == null || doc.length === 0){
                res.sendStatus(404)
            }else{
                res.send(doc)}
        })
    })
}

exports.getScpecificDate = async (req, res) => {
    const token = req.headers['token']
    const {date} = req.body
    User.findOne({token: token}, function(err, user) {
        Tracker.find({email: user.email, date: date}, function(err, doc) {
            if(doc == null || doc.length === 0){
                res.sendStatus(404)
            }else{
                res.send(doc)}
        })
    })
}