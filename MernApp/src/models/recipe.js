const mongoose = require("mongoose");
const validator= require("validator");
const recipeSchema = new mongoose.Schema({
    name:{
        type:String ,
        maxlength:50,
        required:true
    },
    p_id:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    pieces:{
        type:Number,
        default:null
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        default:null
    },
    time:{
        type:Date ,
        default:Date.now
    }
});


//CREATING NEW MODEL CLASS OF STUDENTS
const Recipe = new mongoose.model("recipe" , recipeSchema) ;

//EXPORTING MODULE
module.exports = Recipe;