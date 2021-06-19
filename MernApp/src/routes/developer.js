var express = require("express");
const jwt = require('jsonwebtoken');
var router = express.Router();
const SuperAdmin = require('../models/admin/superAdmin');
const authenticateDeveloper =require('../Middleware/AuthenticateDeveloper') ;
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
    var token;
try {
    console.log(req.body);
    const {gmail , password} = req.body;
    const isSuperAdmin = await SuperAdmin.findOne({gmail,password});
    if(isSuperAdmin){
        token = await isSuperAdmin.generateAuthToken();
        console.log(token);
        res.cookie("isDevSignIn",token,{
            expires:false,
            maxAge:86400000
        });
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
} catch (error) {console.log(error)}
});

router.get("/developer/all" , async(req,res)=>{
try {
    const developers = await SuperAdmin.find();
    if(developers){
        res.send({
            status:1,
            developers
        });
    }
    else{
        res.send({
            status:0,
            message:"Error fetching all developers!**"
        });
    }
} catch (error) {console.log(error)}
});
router.post("/developer/validate" ,authenticateDeveloper, async(req,res)=>{
    console.log("/developer/validate");
    res.send({isAuthenticated:req.isAuthenticated});
});

router.post("/developer/remove/cookie" , async(req,res)=>{
    console.log("/developer/remove/cookie");
    res.clearCookie("isDevSignIn");
    res.send({isRemoved:1});
});
module.exports = router;
