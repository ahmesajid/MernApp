var express = require("express");
const app = express();
var router = express.Router();
const path = require("path");
const multer = require("multer");

const Branches = require('../models/branch');
fNames = null;
router.post("/branch/addImages", (req,res)=>{
    const storage = multer.diskStorage({
        destination: path.join(__dirname,"../../public/Images/Branches/"),
        filename: function(req, file, cb){
           cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
        }
     });
     
     const upload = multer({
        storage: storage,
        limits:{fileSize: 50*1000000},
     }).any("file");
     //ANY FOR MULTIPLE IMAGES

    upload(req,res, (err)=>{
        if(err){
            res.sendStatus(500);
        }
        res.send({
            status:1 , 
            files:req.files
        })
    })
})
router.delete("/branch/deleteAll" ,async(req,res)=>{
    //REQ.BODY IS RECIEVING DATA IN OBJECT FORMAT
    try {
        const isAnyBranch = await Branches.countDocuments({}); 
        if(isAnyBranch){
            await Branches.remove({});     
            console.log("Deleted all branches!")
            res.send({status:1});
        }
        else{
            console.log("Branches already empty!")
            res.send({status:2});
        }
        
    } catch (error) {
        console.log("Error occured deleting all branches : " + error);
        res.send({
            status:0,
            message:"Error occured deleting all branches!**"
        });
    }
    })
router.post("/branch/getdetails" , async(req,res)=>{
    console.log(req.body._id);
    let bData = null;
    try {
        branchData = await Branches.find({_id:req.body._id});
        console.log("bdata is ..")
        console.log(branchData);
        if(branchData)
        {
            res.send({
                status:1,
                bData:branchData
            });
        }
        else{
            res.send({
                status:0,
                message:"Error occured getting branch data!**"
            });
        }
    } catch (error) {
    
    }
});
router.post("/branch/add" ,async(req,res)=>{
    //REQ.BODY IS RECIEVING DATA IN OBJECT FORMAT
    try {
        console.log(req.body);
        const branchData = new Branches(req.body) ;
        const getCountEmails =  await Branches.count({gmail:req.body.gmail});
        if(getCountEmails==0)
        {
            const insertedData = await branchData.save();
            console.log(insertedData);
            res.send({
                status:"ok"
            });
        }
        else{
            res.send({
                status:"error",
                message:"Branches with the same email also exists in database!"
            });   
        }
        
    } catch (error) {
        console.log("Error ocured adding branch : " + error);
        res.send({
            status:"error",
            message:"Error ocured adding branch!**"
        });
    }
    }) 
router.post("/branch/delete" , async(req,res)=>{

    try {
        Branches.deleteMany({p_id:req.body.pId , _id:req.body.bId} , (e)=>{
        console.log(e);
        });
        res.send({
            status:"ok",
        });
        
    } catch (error) {
        console.log("Error ocured deleting branch : " + error);
        res.send({
            status:"error",
            message:"Error ocured adding branch !**"
        });
    }
    });

module.exports = router;
