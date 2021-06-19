var express = require("express");
var router = express.Router();
const BranchAdmin = require("../models/admin/branchAdmin");
const Branches = require('../models/branch');
const authenticateAdmin = require('../Middleware/AuthenticateAdmin');
const jwt = require("jsonwebtoken");
router.delete("/admin/deleteAll" ,async(req,res)=>{
    let message = null;
    //REQ.BODY IS RECIEVING DATA IN OBJECT FORMAT
    try {
        await BranchAdmin.remove();    
        message = "Deleted all admins!" 
        console.log(message)
        res.send({message});
    }catch (error) {
        message=error
        console.log(message);
        res.send({message});
    }
    })
router.post("/admin/signin" ,async(req,res)=>{
    //REQ.BODY IS RECIEVING DATA IN OBJECT FORMAT
    try {
        const {gmail , password} = req.body;
        let aData ,bData ,token ,isBranchAdmin = null;
        isBranchAdmin = await BranchAdmin.countDocuments({gmail,password});
        console.log(isBranchAdmin);

        if(isBranchAdmin)
        {
            aData = await BranchAdmin.findOne({gmail,password});
            bData = await Branches.find({_id:aData.branch_id});
            token = await aData.generateAuthToken();
            res.cookie("isAdminSignIn",token,{
                expires:false,
                maxAge:86400000
            });
            res.send({
                status:1 ,
                bData:bData ,
                aData:aData
            });
        }
        else{
            res.send({
                status:0
            })
        }
        
    } catch (error) {
        console.log("Error occured signing in  : " + error);
        res.send({
            status:0,
            message:"Error occured signing in !**"
        });
    }
    })
router.post("/admin/signup" , async(req,res)=>{
    try {
        console.log(req.body.branchAdminCredentials);
        const insertedDataObj = new BranchAdmin(req.body.branchAdminCredentials);
        const insertedData = await insertedDataObj.save();
        console.log(insertedData);
        res.send({
            status:"ok",
        });
        
    } catch (error) {
        console.log("Error ocured adding branch admin : " + error);
        res.send({
            status:"error",
            message:"Error ocured adding branch admin!**"
        });
    }
    });
router.get("/admin/get" , async(req,res)=>{
    try {
        const admins =await BranchAdmin.find({});
        res.send({
            admins:admins,
        });
        
    } catch (error) {
        console.log("Error ocured adding branch admin : " + error);
        res.send({
            status:"error",
            message:"Error ocured adding branch admin!**"
        });
    }
    });
router.post("/admin/validate" ,authenticateAdmin, async(req,res)=>{
    try {
        console.log("/admin/validate");
    console.log(req._id);
    let aData , bData , isAuthenticated , message =null;
    if(req.isAuthenticated){
        isAuthenticated = req.isAuthenticated;
        aData = await BranchAdmin.find({_id:req._id});
        bData = await Branches.find({_id:aData[0].branch_id});
    }
    if(isAuthenticated)
    {
        if(aData.length && bData.length){
            res.send({
            isAuthenticated ,
            aData,
            bData,
            key:1,
            message:"Admin is authenticated!"})
        }
        else{
            res.send({
            isAuthenticated,
            aData:null,
            bData:null,
            key:-1,
            message:"Admin is not associated with any branch"})
        }
    } 
    else{
        res.send({
        isAuthenticated,
        aData:null,
        bData:null,
        key:0,
        message:"Admin is not authenticated. First authenticate by login!"})
        }
    } catch (error) {
        console.log(error)
    }
    
});

router.post("/admin/remove/cookie" , async(req,res)=>{
    console.log("/admin/remove/cookie");
    res.clearCookie("isAdminSignIn");
    res.send({isRemoved:1});
});
module.exports = router;