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
const Ingredient = require('./model/ingredient')
const Data = require('./model/data')
const User = require('./model/user')

app.get('/select', async(req,res) => {
    let data = await Calorie.findOne({name: "Mini eggplant pizza"})
    res.send(data)
})

app.get('/search', async(req, res) => {
    let response = []
    let data = await Calorie.find(
        {
            "$or":[
                {name:{$regex:'egg'}}
            ]
        }
    )
    for (let i=0; i<10; i++){
        if(data[i] == null){
            break;
        }else{
    response.push({name:data[i].name}, {calorie: data[i].calorie})}
    }
    res.send(data)
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


app.post('/test', async (req, res) => {
    let {id} =req.body
    
    axios.get('https://api.spoonacular.com/food/ingredients/'+id+'/information?amount=1&apiKey=e3166356f0a94a3fbed7b575773d654c').then(resp=>{
        Data.create({
            name: resp.data.name,
            nutrients: resp.data.nutrition.nutrients,
            amount:resp.data.nutrition.weightPerServing
        }).then(pff=>{
            pff.save()
            res.send(pff)
        })
    })
})

const multer = require ('multer');
const user = require('./model/user');

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

let profilePic = makeid()

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './image')
    },
    filename: (req, file, cb)=> {
        cb(null, profilePic + '.jpg')
    }
})

const upload = multer({storage: fileStorage})

app.post('/foodTracker/setProfile', upload.single('image'),(req, res) => {
    const token = req.headers['token']
    User.findOneAndUpdate({token: token},{profilePic: profilePic + '.jpg'}, function(err, user){
        res.json({message: "Saved"})
    })
})

app.get('/foodTracker/getProfilePic', (req, res) => {
    const token = req.headers['token']
    User.findOne({token: token}, function(err, doc) {
        res.sendFile(__dirname + '/image/' + doc.profilePic)
    })
})


const Plate = require ('./model/plate')

app.post('/foodTracker/saveCustomPlate', async(req, res) => {
    const token = req.headers['token']
    const {name, ingredients, data} = req.body
    User.find({token: token}, function(req, usr){
        console.log(usr[0].email)
        Plate.create({
            name: name,
            ingredients: ingredients,
            totalCalorie: data,
            email: usr[0].email,
            platePic: `${name}-${usr[0].email}.jpg`
        }).then(plate => {
            plate.save()
            res.json({
                message: "Saved"
            })
        })
    })
})

app.get('/foodTracker/getPlatePic', (req, res) => {
    const token = req.headers['token']
    User.findOne({token: token}, function(err, doc){
        Plate.findOne({email: doc.email}, function(err, plate) {
            res.sendFile(__dirname + '/image/' + plate.platePic)
        })
        console.log(doc.email)})
    
})



app.listen(2500, () => {
    console.log('FoodTracker is up')
})