const mongoose = require("mongoose");
const validator= require("validator");
const branchSchema = new mongoose.Schema({
    name:{
        type:String ,
        maxlength:50,
        required:true
    },
    description:{
        type:String,
        required:true,
        minlength:15
    },
    gmail:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        validate(email){
            if(!validator.isEmail(email))
            {
                throw new error ("Not a valid email");
            }
        }
    },
    city:{
        type:String,
        required:true,
        lowercase:true,
    },
    p_id:{
        type:String,
        required:true
    },
    opens:{
        type:String,
        required:true
    },
    closes:{
        type:String,
        required:true
    },
    contact:
    {
        type:Number,
        required:true,
        minlength:7,
        maxlength:16
    },
    time:{
        type:Date ,
        default:Date.now
    },
    location:{
        type:String,
        required:true,
    },
    fNames:[{
        type:String,
        required:true
    }]
});


//CREATING NEW MODEL CLASS OF STUDENTS
const Branches = new mongoose.model("branch" , branchSchema) ;

//EXPORTING MODULE
module.exports = Branches;