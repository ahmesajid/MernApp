const mongoose = require("mongoose");
const validator= require("validator");

const issueSchema = new mongoose.Schema({
    description:{
        type:String ,
        minlength:10,
        required:true
    },
    email:{
    type:String,
    lowercase:true,
    unique:true,
    required:true,
    validate(email){
        if(!validator.isEmail(email))
        {
            throw new error ("Not a valid email");
        }
    }},
    title:{
        type:String,
        require:true
    },
    isOpen:{
        type:Boolean ,
        default:true
    },
    isAdmin:{
        type:Boolean ,
        default:false
    },
    isUser:{
        type:Boolean ,
        default:false
    },
    a_id:{
        type:String ,
        default:null
    },
    time:{
        type:Date ,
        default:Date.now
    }
});


//CREATING NEW MODEL CLASS OF ISSUE
const issue = new mongoose.model("issue" , issueSchema) ;

//EXPORTING MODULE
module.exports = issue;