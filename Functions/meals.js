apiKey = '5a7d5e15a2db4b15b3b2ed318b1c9f19'
const Calorie = require('../model/track')

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
    let data = await Calorie.find();
    for (let i=0; i<30; i++){
        if(data[i] == null){
            break;
        }else{
    response.push({name:data[i].name}, {calorie: data[i].calorie})}
    }
    res.send(response)
}

exports.mealSearch = async (req, res) => {
    let response = []
    let data = await Calorie.find(
        {
            "$or":[
                {name:{$regex:'egg'}}
            ]
        }
    )
    for (let i=0; i<30; i++){
        if(data[i] == null){
            break;
        }else{
    response.push({name:data[i].name}, {calorie: data[i].calorie})}
    }
    res.send(response)
}

exports.mealSelect = async (req, res) => {
    let {query} = req.body
    let data = await Calorie.findOne({name: query})
    res.send(data)
}