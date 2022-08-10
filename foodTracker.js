const express = require('express')
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJSDocs =  YAML.load('./api.yaml');
const app = express()
const mongoose = require('mongoose');
const { default: axios } = require('axios');
mongoose.connect('mongodb+srv://sani:3490450353@cluster0.98bjy3e.mongodb.net/foodTracker')
const db = mongoose.connection;

//check db connection
db.once('open', () => {
    console.log ('connected');
});

//check for db errors
db.on('error', (error) => {
    console.log(error)
})

app.use(express.json());

app.use("", require("./routes/routes"))
app.use('/foodtracker/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDocs))


const Recipe = require('./model/calorie');
const Calorie = require('./model/track')

app.post('/search', async(req, res) => {
    Recipe.find({ title: { $regex: /'egg'$/ } }).then(resp => {
        res.send(resp.data)
    })

})

app.post('/fetch', async(req, res) => {
    Recipe.find({},{_id:0,id:1},function(error, docs){
        let response = []
         for(let i=2250; i<2300; i++){
           axios.get('https://api.spoonacular.com/recipes/'+docs[i].id+'/information?apiKey=7b38d022be7e49daa79b7012ad59db38&includeNutrition=true').then(resp=>{
            console.log(i)
            Calorie.create({
                name: resp.data.title,
                calorie:resp.data.nutrition.nutrients
            }).then(track => {
                track.save()
            })
            }
   )
   // res.sendStatus(docs[0].id)
    }
 
    }
    )
    
})


app.listen(2500, () => {
    console.log('FoodTracker is up')
})