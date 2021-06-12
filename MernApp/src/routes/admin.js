var express = require("express");
var router = express.Router();
const BranchAdmin = require("../models/admin/branchAdmin");
const Branches = require('../models/branch');
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
        console.log(req.body);
        const isBranchAdmin = await BranchAdmin.countDocuments({gmail:req.body.gmail ,password:req.body.password});
        let aData = null;
        let bData = null;
        console.log(isBranchAdmin);

        if(isBranchAdmin>0)
        {
            if(req.body.getData)
            {
                aData = await BranchAdmin.find({gmail:req.body.gmail ,password:req.body.password});
                bData = await Branches.find({_id:aData[0].branch_id});
                console.log(aData)
                console.log(bData)
                res.send({
                    status:1,
                    bData:bData 
                });
            }
            res.send({
                status:2
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
module.exports = router;