var express = require("express");
var router = express.Router();
const BranchAdmin = require("../models/admin/branchAdmin");
const Branches = require('../models/branch');
const authenticateAdmin = require('../Middleware/AuthenticateAdmin');
const jwt = require("jsonwebtoken");
router.delete("/admin/deleteAll" ,async(req,res)=>{
    //REQ.BODY IS RECIEVING DATA IN OBJECT FORMAT
    try {
        const isAnyBranchAdmin = await BranchAdmin.countDocuments({}); 
        console.log(isAnyBranchAdmin);
        if(isAnyBranchAdmin){
            await BranchAdmin.remove();     
            console.log("Deleted all branch admins!")
            res.send({status:1});
        }
        else{
            console.log("Collection already empty!")
            res.send({status:2});
        }
        
    } catch (error) {
        console.log("Error occured deleting all admins : " + error);
        res.send({
            status:0,
            message:"Error occured deleting all admins!**"
        });
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
    console.log("/admin/validate");
    aData = await BranchAdmin.findOne({_id:req._id});
    bData = await Branches.find({_id:aData.branch_id});
    res.send({isAuthenticated:req.isAuthenticated ,aData:aData,bData:bData});
});
module.exports = router;