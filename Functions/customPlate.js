const axios = require('axios')
const User = require('../model/user')
const Plate = require ('../model/plate')
const key = ['7e77db1394de44a0a9ec0ce4b2dddfbf', '8e1bc56cf1d84c6b8c510a7560ecded4']
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const apiKey = key[getRandomInt(1)]


exports.createCustomPlate = async(req, res) => {
    const {query}=req.body
    try{axios.get('https://api.spoonacular.com/food/ingredients/search?query='+query+'&apiKey='+apiKey).then(resp => {
        res.send(resp.data)
    })} catch(error){
        res.sendStatus(404)
    }
}

exports.selectIngredient = async(req, res) => {
    const {id, amount} = req.body
    try{
        axios.get(`https://api.spoonacular.com/food/ingredients/${id}/information?amount=${amount}&unit=g&apiKey=${apiKey}`).then(resp=>{
            res.send(resp.data.nutrition)
        })
    } catch(error){
        res.sendStatus(400)
    }

}

exports.saveCustomPlate = async(req, res) => {
    const token = req.headers['token']
    const {name, ingredients, data} = req.body
    try{Plate.create({
        name,
        ingredients,
        totalCalorie: data,
        token
    }).then(plate => {
        plate.save();
        res.sendStatus(200)
    })} catch(error){
        res.sendStatus(400)
    }
}

exports.platesList = async(req, res) => {
    const token = req.headers['token']
    Plate.find({token}, function(err,doc){
        res.send(doc)
    })
}
