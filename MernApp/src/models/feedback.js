const mongoose = require("mongoose");
const validator= require("validator");
const feedbackSchema = new mongoose.Schema({
    name:{
        type:String ,
        maxlength:50,
        lowercase:true,
        required:true
    },
    gmail:{
        type:String,
        lowercase:true,
        required:true,
        validate(email){
            if(!validator.isEmail(email))
            {
                throw new error ("Not a valid email");
            }
        }
    },
    restaurant:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        default:"To the owner of restaurant"
    },
    message:{
        type:String,
        required:true,
        minlength:10
    },
    time:{
        type:Date ,
        default:Date.now
    }
});


//CREATING NEW MODEL CLASS OF STUDENTS
const Feedbacks = new mongoose.model("feedback" , feedbackSchema) ;

//EXPORTING MODULE
module.exports = Feedbacks;