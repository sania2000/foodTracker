const axios = require ('axios')
apiKey = '7e77db1394de44a0a9ec0ce4b2dddfbf';
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