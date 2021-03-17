var express = require("express")
var router = express.Router();
const SuperAdmin = require('../models/admin/superAdmin');

router.post("/developer/signup" , async(req,res)=>{
    try {
        const insertedDataObj = new SuperAdmin(req.body);
        const insertedData = await insertedDataObj.save();
        console.log(insertedData);
        res.send({
            status:"ok",
        });
        
    } catch (error) {
        console.log("Error ocured adding super admin : " + error);
        res.send({
            status:"error",
            message:"Error ocured adding super admin!**"
        });
    }
    });
router.post("/developer/signin" , async(req,res)=>{
    console.log(req.body);
try {
    const isSuperAdmin = await SuperAdmin.countDocuments({gmail:req.body.gmail ,password:req.body.password});
    if(isSuperAdmin>0)
    {
        res.send({
            status:1,
            message:"Developer logged in!"
        });
    }
    else{
        res.send({
            status:0,
            message:"Invalid developer credentials!**"
        });
    }
} catch (error) {
    
}
});

module.exports = router;
