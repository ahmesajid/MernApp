const mongoose = require("mongoose");
const validator= require("validator");
const restaurantSchema = new mongoose.Schema({
    name:{
        type:String ,
        maxlength:50,
        required:true
    },
    branches:{
        type:Number,
        default:0,
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
    fName:{
        type:String,
        required:true
    },
    time:{
        type:Date ,
        default:Date.now
    }
});


//CREATING NEW MODEL CLASS OF STUDENTS
const Restaurants = new mongoose.model("restaurant" , restaurantSchema) ;

//EXPORTING MODULE
module.exports = Restaurants;