const jwt = require('jsonwebtoken');
const Admin = require('../models/admin/branchAdmin');

const AuthenticateAdmin = async(request,response,next)=>{
    try {
        let verifyAdmin , admin=null;
        const cookie = request.cookies.isAdminSignIn;
        let secretKey = process.env.SECRET_KEY || 'MYNAMEISAHMERBINSAJIDFROMPUNJABUNIVERSITYTHEMALLL';
        if(cookie!=null){
            verifyAdmin = jwt.verify(cookie ,secretKey);
            admin = await Admin.countDocuments({_id:verifyAdmin._id ,"tokens.token":cookie});
        }
        if(admin){
            request.isAuthenticated=admin;
            request._id=verifyAdmin._id;
        }else{
            request.isAuthenticated=admin;
        }
        next();
    } catch (error) {
        
    }
   
}
module.exports = AuthenticateAdmin;