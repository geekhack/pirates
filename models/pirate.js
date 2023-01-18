//import mongoose
const mongoose = require('mongoose')
const { array } = require('mongoose/lib/utils')

const pirateSchema = mongoose.Schema({
     pirate_name:{
        type: String,  
        required: true
     },
     pirate_position:{
        type:String,
        required: true
     },
     pirate_image:{
        type: String,
        required: true
     },
     pirate_attributes:{
        type: array,
        required: true
     },
     pirate_catch_phrase:{
        type: String,
        required: true
     },
     pirate_treasure_chest:{
      type: Number,
      required: true
   }
     
},
)

let Pirate = mongoose.model('Pirate',pirateSchema)

module.exports = Pirate