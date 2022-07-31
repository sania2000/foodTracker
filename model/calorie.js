const mongoose = require('mongoose')



const recipe = mongoose.Schema(
    {
        id:{},
        name:{},
        image:{},
        link:{},
        type:{},
        relevance:{},
        content:{},
        dataPoints:{}
    }
)



module.exports = mongoose.model('Recipe', recipe)