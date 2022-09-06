const axios = require ('axios')
const apiKey = '069c7142c3f44e45b8702ba040e9032f'
const User = require('../model/user')

exports.generatePlan = async(req, res) => {
    const token = req.headers["token"]
    // console.log(token)
    User.find({token: token}, function(error, docs){
        docs = docs[0]
        console.log(docs.dailyCalorieNeed)
        // res.send(docs.dailyCalorieNeed)
        let targetCalories = docs.dailyCalorieNeed
        let diet = `=${docs.diet}`
        axios.get(`https://api.spoonacular.com/mealplanner/generate?timeFrame=week&diet${diet}&targetCalories=${targetCalories}&apiKey=${apiKey}`).then(resp=>{
        res.send(resp.data)
    })
    })
// } catch(error){
//         res.sendStatus(400)
//     }
    
}