const jwt = require('jsonwebtoken');
const Developer = require('../models/admin/superAdmin');

const AuthenticateDeveloper = async(request,response,next)=>{
    try {
        let developer =null;
        let secretKey =process.env.SECRET_KEY || 'MYNAMEISAHMERBINSAJIDFROMPUNJABUNIVERSITYTHEMALLL';
        const cookie =await request.cookies.isDevSignIn;
        if(cookie){
            const verifyDeveloper = jwt.verify(cookie ,secretKey );
            // FIND ONE IF SEND DATA TO FRONT END
            developer = await Developer.countDocuments({_id:verifyDeveloper._id ,"tokens.token":cookie});
        }
        developer?request.isAuthenticated=developer:request.isAuthenticated=developer;
        next();
    } catch (error) {console.log(error)}
   
}
module.exports = AuthenticateDeveloper;