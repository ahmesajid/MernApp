const jwt = require('jsonwebtoken');
const Developer = require('../models/admin/superAdmin');

const AuthenticateDeveloper = async(request,response,next)=>{
    try {
        console.log("Authenticate developer");
        const cookie =await request.cookies.isDevSignIn;
        let developer =null;
        if(cookie){
            const verifyDeveloper = jwt.verify(cookie , process.env.SECRET_KEY);
            // FIND ONE IF SEND DATA TO FRONT END
            developer = await Developer.countDocuments({_id:verifyDeveloper._id ,"tokens.token":cookie});
            console.log(developer);
        }
        
        developer?request.isAuthenticated=developer:request.isAuthenticated=false;
        next();
    } catch (error) {
        
    }
   
}
module.exports = AuthenticateDeveloper;