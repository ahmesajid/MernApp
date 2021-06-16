const mongoose = require("mongoose");
const validator= require("validator");
const reservationSchema = new mongoose.Schema({
    name:{
        type:String ,
        maxlength:50,
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
    time:{
        type:Date ,
        default:Date.now
    },
    persons:{
        type:Number ,
        required:true
    },
    number:{
        type:Number ,
        required:true,
        minlength:11,
        maxlength:11
    },
    resDate:{
        type:Date,
        required:true,    
    },
    resTime:{
        type:String,
        required:true,    
    },
    b_id:{
        type:String,
        required:true
    }
});


//CREATING NEW MODEL CLASS OF STUDENTS
const Reservation = new mongoose.model("reservation" , reservationSchema) ;

//EXPORTING MODULE
module.exports = Reservation;