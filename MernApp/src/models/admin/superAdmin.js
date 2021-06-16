const mongoose = require("mongoose");
const validator= require("validator");
const jwt = require('jsonwebtoken');
const superAdminSchema = new mongoose.Schema({
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
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
});
superAdminSchema.methods.generateAuthToken = async function (){
    try {
            let token =  jwt.sign({_id:this._id},process.env.SECRET_KEY);
            this.tokens = this.tokens.concat({token:token});
            await this.save();
            return token;
    } catch (error) {
        console.log(error);
    }
}


//CREATING NEW MODEL CLASS OF STUDENTS
const SuperAdmins = new mongoose.model("superadmin" , superAdminSchema) ;

//EXPORTING MODULE
module.exports = SuperAdmins;