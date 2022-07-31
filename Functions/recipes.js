const axios = require('axios')
apiKey = 'b677245ba7e34e34b921ca7303c18a45'

exports.recipes = async (req, res) => {
    axios.get('https://api.spoonacular.com/recipes/complexSearch?number=30&apiKey=' + apiKey).then(resp => {
        res.send(resp.data)
    })
}


exports.rescipeSearch = async(req, res) => {
    
    let {query, diet, maxCalories, maxReadyTime, intolerances, type}=req.body
    let response = []
    query = `=${query}`
    diet = `=${diet}`
    // maxCalories = `=${maxCalories}`
    intolerances = `=${intolerances}`
    type = `=${type}`
    // maxReadyTime = "" + maxReadyTime
    // maxReadyTime = `=${maxReadyTime}`
    let url = ` https://api.spoonacular.com/recipes/complexSearch?query${query}&diet${diet}&number=30&maxReadyTime${maxReadyTime}&intolerances${intolerances}&type${type}&maxCalories${maxCalories}`
        axios.get(url
        +"&addRecipeNutrition=true&instructionsRequired=false&addRecipeInformation=false&fillIngredients=false&apiKey="+apiKey).then(resp => {
            
            for(let i=0; i<30; i++){
            response.push({
                id:resp.data.results[i].id,
                title:resp.data.results[i].title,
                calories:resp.data.results[i].nutrition.nutrients[0]
            })
            }
            res.send(response)})
   
   
}

exports.selectRecipe = async(req, res) => {
    const {id} = req.body
    try{axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=` + apiKey).then(
        resp => {
            res.send(
                {
                title:resp.data.title,
                image: resp.data.image,
                servings: resp.data.servings,
                readyInMinutes:{preparationTime: resp.data.preparationMinutes, cookingTime: resp.data.cookingMinutes},
                dairyFree:resp.data.dairyFree, 
                diets:resp.data.diets,
                ingredients: resp.data.extendedIngredients,
                nutrients:resp.data.nutrition.nutrients,
                calorieBreakdown:resp.data.nutrition.caloricBreakdown,
                weightPerServing:resp.data.nutrition.weightPerServing,
                summary:resp.data.summary,
                instruction:resp.data.analyzedInstructions,
                }
                )
        }
    )} catch(error){
        res.send(404)
    }
}