const axios = require('axios')
apiKey = '5a7d5e15a2db4b15b3b2ed318b1c9f19'


exports.mealList = async (req, res) => {
    const {foodType} = req.body
    axios.get('https://api.spoonacular.com/recipes/complexSearch?type='+foodType+'&number=30&apiKey=' + apiKey).then(resp=> {    
        res.send(resp.data)
        })

}

//create search api

exports.mealListSearch = async(req, res) => {
    const {query} = req.body
    console.log(query)
    axios.get('https://api.spoonacular.com/food/search?query='+query+'&apiKey='+apiKey).then(resp=> {    
        let responses = [{simpleFood: resp.data.searchResults[5]},{recipe: resp.data.searchResults[0]}]
        res.send(responses)
        }) 

}

exports.calorieTracker = async(req, res) => {

}
