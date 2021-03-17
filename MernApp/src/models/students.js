const mongoose = require("mongoose");
const validator= require("validator");

const studentSchema = new mongoose.Schema({
    name:{
        type:String , 
        minlength:5,
        maxlength:50,
        uppercase:true,
        required:true
    },
    cnic:{
        type:Number , 
        minlength:13,
        maxlength:13,
        required:true,
        unique:true
    },
    roll:{
        type:String,
        default:"BSEF",

        minlength:4,
        maxlength:10
    },
    gmail:{
        type:String,
        unique:true,
        required:true,
        validate(email){
            if(!validator.isEmail(email))
            {
                throw new error ("Not a valid email");
            }
        }
    },
    samester:{
        type:Number,
        required:true,
        minlength:1,
        maxlength:1
    },
    cgpa:{
        type:Number,
        default:0,
        minlength:1,
        maxlength:1,
    }
});


//CREATING NEW MODEL CLASS OF STUDENTS
const Student = new mongoose.model("student" , studentSchema) ;

//EXPORTING MODULE
module.exports = Student;