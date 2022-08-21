const axios = require('axios')
const { macros } = require('fitness-calculator')
apiKey = 'b677245ba7e34e34b921ca7303c18a45'

exports.recipes = async (req, res) => {
    const response = []
    axios.get('https://api.spoonacular.com/recipes/complexSearch?number=30&addRecipeNutrition=true&apiKey=' + apiKey).then(resp => {
        if (resp.data.totalResults == 0){
            res.sendStatus(404)
        }
        else{for(let i=0; i<`${resp.data.number}`; i++){
        response.push({
            id:resp.data.results[i].id,
            title:resp.data.results[i].title,
            calories:resp.data.results[i].nutrition.nutrients[0],
            image: resp.data.results[i].image
        })
        }
        res.send(response)}
    })
}


exports.recipeSearch = async(req, res) => {
    let parammmmms = {}
    let {query, diet, maxCalories, maxReadyTime, intolerances, type}=req.body
    let response = []
    
    parammmmms = {
        addRecipeNutrition : true,
        instructionsRequired: false,
        addRecipeInformation: false,
        fillIngredients: false,
        apiKey: apiKey,
    }

    query != undefined? parammmmms['query'] = query : void 0
    diet != undefined? parammmmms['diet'] = diet : void 0
    maxCalories != undefined? parammmmms['maxCalories'] = maxCalories : void 0
    maxReadyTime != undefined? parammmmms['maxReadyTime'] = maxReadyTime : void 0
    intolerances != undefined? parammmmms['intolerances'] = intolerances : void 0
    type != undefined? parammmmms['type'] = type : void 0

    axios.get('https://api.spoonacular.com/recipes/complexSearch', { params: parammmmms }).then(resp => {
            if (resp.data.totalResults == 0){
                res.sendStatus(404)
            }
            else{for(let i=0; i<`${resp.data.number}`; i++){
            response.push({
                id:resp.data.results[i].id,
                title:resp.data.results[i].title,
                calories:resp.data.results[i].nutrition.nutrients[0],
                image: resp.data.results[i].image
            })
            }
            console.log(parammmmms)
            res.send(response)}

        }
        
            )
            
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