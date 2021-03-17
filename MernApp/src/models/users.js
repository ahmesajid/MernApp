const mongoose = require("mongoose");
const validator= require("validator");

const userSchema = new mongoose.Schema({
    name:{
        type:String ,
        maxlength:50,
        lowercase:true,
        required:true
    },
    phone:{
        type:Number,
        requird:true,
        minlength:11,
        maxlength:11
    },
    gmail:{
        type:String,
        lowercase:true,
        unique:true,
        required:true,
        validate(email){
            if(!validator.isEmail(email))
            {
                throw new error ("Not a valid email");
            }
        }
    },
    password:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        lowercase:true,
        required:true
    },
    
    time:{
        type:Date ,
        default:Date.now
    }
});


//CREATING NEW MODEL CLASS OF STUDENTS
const Users = new mongoose.model("user" , userSchema) ;

//EXPORTING MODULE
module.exports = Users;