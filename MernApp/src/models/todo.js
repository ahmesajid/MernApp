const mongoose = require("mongoose");
const validator= require("validator");
const todoSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
});


//CREATING NEW MODEL CLASS OF STUDENTS
const Todo = new mongoose.model("todo" , todoSchema) ;

//EXPORTING MODULE
module.exports = Todo;