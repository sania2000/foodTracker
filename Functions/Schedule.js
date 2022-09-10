const axios = require ('axios')
const apiKey = 'bff6a9694faf437699c3580ca49ce114'
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