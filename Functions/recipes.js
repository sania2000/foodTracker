const axios = require('axios')
const { macros } = require('fitness-calculator')
const key = ['7e77db1394de44a0a9ec0ce4b2dddfbf', '8e1bc56cf1d84c6b8c510a7560ecded4']
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const apiKey = key[getRandomInt(1)]


let tempRes = [
    {
      "id": 716426,
      "title": "Cauliflower, Brown Rice, and Vegetable Fried Rice",
      "calories": {
        "name": "Calories",
        "amount": 191.71,
        "unit": "kcal",
        "percentOfDailyNeeds": 9.59
      },
      "image": "https://spoonacular.com/recipeImages/716426-312x231.jpg"
    },
    {
      "id": 715594,
      "title": "Homemade Garlic and Basil French Fries",
      "calories": {
        "name": "Calories",
        "amount": 556.62,
        "unit": "kcal",
        "percentOfDailyNeeds": 27.83
      },
      "image": "https://spoonacular.com/recipeImages/715594-312x231.jpg"
    },
    {
      "id": 715497,
      "title": "Berry Banana Breakfast Smoothie",
      "calories": {
        "name": "Calories",
        "amount": 440.37,
        "unit": "kcal",
        "percentOfDailyNeeds": 22.02
      },
      "image": "https://spoonacular.com/recipeImages/715497-312x231.jpg"
    },
    {
      "id": 644387,
      "title": "Garlicky Kale",
      "calories": {
        "name": "Calories",
        "amount": 169.87,
        "unit": "kcal",
        "percentOfDailyNeeds": 8.49
      },
      "image": "https://spoonacular.com/recipeImages/644387-312x231.jpg"
    },
    {
      "id": 716268,
      "title": "African Chicken Peanut Stew",
      "calories": {
        "name": "Calories",
        "amount": 1197.3,
        "unit": "kcal",
        "percentOfDailyNeeds": 59.86
      },
      "image": "https://spoonacular.com/recipeImages/716268-312x231.jpg"
    },
    {
      "id": 716381,
      "title": "Nigerian Snail Stew",
      "calories": {
        "name": "Calories",
        "amount": 348.52,
        "unit": "kcal",
        "percentOfDailyNeeds": 17.43
      },
      "image": "https://spoonacular.com/recipeImages/716381-312x231.jpg"
    },
    {
      "id": 782601,
      "title": "Red Kidney Bean Jambalaya",
      "calories": {
        "name": "Calories",
        "amount": 551.94,
        "unit": "kcal",
        "percentOfDailyNeeds": 27.6
      },
      "image": "https://spoonacular.com/recipeImages/782601-312x231.jpg"
    },
    {
      "id": 794349,
      "title": "Broccoli and Chickpea Rice Salad",
      "calories": {
        "name": "Calories",
        "amount": 524.29,
        "unit": "kcal",
        "percentOfDailyNeeds": 26.21
      },
      "image": "https://spoonacular.com/recipeImages/794349-312x231.jpg"
    },
    {
      "id": 639535,
      "title": "Citrusy Pecan Garbanzo Couscous: A Salad For Cold Weather",
      "calories": {
        "name": "Calories",
        "amount": 561.77,
        "unit": "kcal",
        "percentOfDailyNeeds": 28.09
      },
      "image": "https://spoonacular.com/recipeImages/639535-312x231.jpg"
    },
    {
      "id": 652417,
      "title": "Moroccan chickpea and lentil stew",
      "calories": {
        "name": "Calories",
        "amount": 465.63,
        "unit": "kcal",
        "percentOfDailyNeeds": 23.28
      },
      "image": "https://spoonacular.com/recipeImages/652417-312x231.jpg"
    }
  ]

exports.recipes = async (req, res) => {
    // const response = []
    // axios.get('https://api.spoonacular.com/recipes/complexSearch?number=30&addRecipeNutrition=true&apiKey=' + apiKey).then(resp => {
    //     if (resp.data.totalResults == 0){
    //         res.sendStatus(404)
    //     }
    //     else{for(let i=0; i<`${resp.data.number}`; i++){
    //     response.push({
    //         id:resp.data.results[i].id,
    //         title:resp.data.results[i].title,
    //         calories:resp.data.results[i].nutrition.nutrients[0],
    //         image: resp.data.results[i].image
    //     })
    //     }
    //     res.send(response)}
    // })
    res.send(tempRes)
}


exports.recipeSearch = async(req, res) => {
    let parammmmms = {}
    let {query, diet, maxCalories, maxReadyTime, intolerances, type}=req.body
    // let response = []
    
    // parammmmms = {
    //     addRecipeNutrition : true,
    //     instructionsRequired: false,
    //     addRecipeInformation: false,
    //     fillIngredients: false,
    //     apiKey: apiKey,
    // }

    // query != undefined? parammmmms['query'] = query : void 0
    // diet != undefined? parammmmms['diet'] = diet : void 0
    // maxCalories != undefined? parammmmms['maxCalories'] = maxCalories : void 0
    // maxReadyTime != undefined? parammmmms['maxReadyTime'] = maxReadyTime : void 0
    // intolerances != undefined? parammmmms['intolerances'] = intolerances : void 0
    // type != undefined? parammmmms['type'] = type : void 0

    // axios.get('https://api.spoonacular.com/recipes/complexSearch', { params: parammmmms }).then(resp => {
    //         if (resp.data.totalResults == 0){
    //             res.sendStatus(404)
    //         }
    //         else{for(let i=0; i<`${resp.data.number}`; i++){
    //         response.push({
    //             id:resp.data.results[i].id,
    //             title:resp.data.results[i].title,
    //             calories:resp.data.results[i].nutrition.nutrients[0],
    //             image: resp.data.results[i].image
    //         })
    //         }
    //         console.log(parammmmms)
    //         res.send(response)}

    //     }
        
    //         )
    res.send(tempRes)
            
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