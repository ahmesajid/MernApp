const mongoose = require("mongoose");
const validator= require("validator");
const branchSchema = new mongoose.Schema({
    b_id:{
        type:String,
        required:true
    },
});


//CREATING NEW MODEL CLASS OF STUDENTS
const Recommendations = new mongoose.model("recommendation" , branchSchema) ;

//EXPORTING MODULE
module.exports = Recommendations;