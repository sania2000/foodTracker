const key = ['7e77db1394de44a0a9ec0ce4b2dddfbf', '8e1bc56cf1d84c6b8c510a7560ecded4']

const apiKey = key[getRandomInt(1)]

const e = require('express');
const Calorie = require('../model/track')
const Data = require('../model/data')

// exports.mealList = async (req, res) => {
//     const {foodType} = req.body
//     axios.get('https://api.spoonacular.com/recipes/complexSearch?type='+foodType+'&number=30&apiKey=' + apiKey).then(resp=> {    
//         res.send(resp.data)
//         })

// }

// //create search api

// exports.mealListSearch = async(req, res) => {
//     const {query} = req.body
//     console.log(query)
//     // axios.get('https://api.spoonacular.com/food/search?query='+query+'&apiKey='+apiKey).then(resp=> {    
//     //     let responses = [{simpleFood: resp.data.searchResults[5]},{recipe: resp.data.searchResults[0]}]
//     //     res.send(responses)
//     //     }) 

// }

// // exports.calorieTracker = async(req, res) => {

// // }


exports.mealList = async (req, res) => {
    let response = []
    let data = await Data.find();
    if (data == null){
        res.status(404).json({
            message: "Not Found"
        })
    }else{
        for (let i=0; i<10; i++){
            if(data[i] == null){
                break;
            }else{
        response.push(data[i])}
        }
        res.send(response)
    }
}

exports.mealSearch = async (req, res) => {
    let response = []
    let {query} = req.body
    let data = await Data.find(
        {
            "$or":[
                {name:{$regex:query}}
            ]
        }
    )
    if (data[0] == null){
        res.status(404).json({
            message: "Not Found"
        })
    }else{
        
        res.send(data)
    }
}

exports.mealSelect = async (req, res) => {
    let {query} = req.body
    let data = await Calorie.findOne({name: query})
    if (data == null){
        res.status(404).json({
            message: "Not Found"
        })}else{
            res.send(data) 
        }
    res.send(data)
}