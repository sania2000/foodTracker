const mongoose = require('mongoose')



const ingredient = mongoose.Schema(
    {
        id:{},
        name:{},
        image:{},
    }
)



module.exports = mongoose.model('Ingredient', ingredient)