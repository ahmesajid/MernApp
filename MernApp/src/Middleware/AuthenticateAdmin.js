const jwt = require('jsonwebtoken');
const Admin = require('../models/admin/branchAdmin');

const AuthenticateAdmin = async(request,response,next)=>{
    try {
        let verifyAdmin , admin=null;
        console.log("Authenticate admin");
        const cookie =await request.cookies.isAdminSignIn;
        if(cookie){
            verifyAdmin = jwt.verify(cookie , process.env.SECRET_KEY);
            // FIND ONE IF SEND DATA TO FRONT END
            admin = await Admin.countDocuments({_id:verifyAdmin._id ,"tokens.token":cookie});
            console.log(admin);
        }
        if(admin){
            request.isAuthenticated=admin;
            request._id=verifyAdmin._id;
        }else{
            request.isAuthenticated=false;
        }
        next();
    } catch (error) {
        
    }
   
}
module.exports = AuthenticateAdmin;