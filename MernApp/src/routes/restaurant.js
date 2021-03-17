var express = require("express");
const app = express();
var router = express.Router();
const path = require("path")
const Restaurants = require("../models/restaurant");
const Branches = require('../models/branch');
const multer = require("multer");

router.post("/restaurant/upload", (req,res)=>{
    const storage = multer.diskStorage({
        destination: path.join(__dirname,"../../public/Images/Restaurants/"),
        filename: function(req, file, cb){
           cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
        }
     });
     
     const upload = multer({
        storage: storage,
        limits:{fileSize: 50*1000000},
     }).single("myImage");

    upload(req,res, (err)=>{
        if(err){
            res.sendStatus(500);
        }
        console.log(req.file)
        res.send(req.file)
    })
})
router.delete("/restaurant/deleteAll" ,async(req,res)=>{
    //REQ.BODY IS RECIEVING DATA IN OBJECT FORMAT
    try {
        const isAnyRestaurant = await Restaurants.countDocuments({}); 
        console.log(isAnyRestaurant);
        if(isAnyRestaurant){
            await Restaurants.remove();     
            console.log("Deleted all restaurants!")
            res.send({status:1});
        }
        else{
            console.log("Collection already empty!")
            res.send({status:2});
        }
    } catch (error) {
        console.log("Error occured deleting all restaurants : " + error);
        res.send({
            status:0,
            message:"Error occured deleting all restaurants!**"
        });
    }
    })
router.post("/restaurant/getsingle" , async(req,res)=>{
    try {
        console.log(req.body);
    
        const resData = await Restaurants.find(req.body);
            console.log(resData);
            res.send({
                status:"ok" ,
                res:resData
            });
    } catch (error) {
        console.log("Error occured getting restaurant : " + error);
        res.send({
            status:"error",
            message:"Error occured getting restaurant !**"
        });
    }
    });
router.get("/restaurantadmin/get" , async(req,res)=>{
    try {
        const adminsData = await ResturantAdmin.find();
            console.log(adminsData);
            res.send({
                status:"ok" ,
                admins:adminsData
            });
    } catch (error) {
        console.log("Error occured getting restaurant admin : " + error);
        res.send({
            status:"error",
            message:"Error occured getting restaurant admin!**"
        });
    }
    });
router.get("/restaurant/get" ,async(req,res)=>{
    //REQ.BODY IS RECIEVING DATA IN OBJECT FORMAT
        try {
            const restaurantsData = await Restaurants.find();
                console.log(restaurantsData);
                res.send({
                    status:"ok" ,
                    resData:restaurantsData
                });
            
        } catch (error) {
            console.log("Error ocured fetching restaurants : " + error);
            res.send({
                status:"error",
                message:"Error ocured fetching restaurants!**"
            });
        }
    })

router.post("/restaurant/add" ,async(req,res)=>{
    //REQ.BODY IS RECIEVING DATA IN OBJECT FORMAT
        try {
            const restaurantData = new Restaurants(req.body) ;
            const getCountEmails =  await Restaurants.countDocuments({gmail:req.body.gmail});
            if(getCountEmails==0)
            {
                const insertedData = await restaurantData.save();
                console.log(insertedData);
                res.send({
                    status:"ok"
                });
            }
            else{
                res.send({
                    status:"error",
                    message:"Restaurant with the same email also exists in database!"
                });   
            }
            
        } catch (error) {
            console.log("Error ocured adding restaurant : " + error);
            res.send({
                status:"error",
                message:"Error ocured adding restaurant!**"
            });
        }
    })
router.post("/restaurant/delete" , async(req,res)=>{
    try {
        Branches.deleteMany({p_id:req.body.resId} , (e)=>{
            console.log(e);
        });
        Restaurants.deleteMany({_id:req.body.resId} , (e)=>{
            console.log(e);
        })
        res.send({
            status:"ok",
        });
        
    } catch (error) {
        console.log("Error ocured deleting restaurant : " + error);
        res.send({
            status:"error",
            message:"Error ocured adding restaurant !**"
        });
    }
    });
router.post("/restaurant/cities" ,async(req,res)=>{
    //REQ.BODY IS RECIEVING DATA IN OBJECT FORMAT
        try {
            console.log(req.body.res);
            if(req.body.res){
                const citiesData = await Branches.find({p_id:req.body.res});
                console.log("data is "+ citiesData);
                res.send({
                    status:"ok" ,
                    cities:citiesData
                });
            }
            else{
                const citiesData = await Branches.find();
                console.log("data is "+ citiesData);
                res.send({
                    status:"ok" ,
                    cities:citiesData
                });
            }
            
            
        } catch (error) {
            console.log("Error ocured fetching restaurant cities : " + error);
            res.send({
                status:"error",
                message:"Error ocured fetching restaurant cities!**"
            });
        }
    })
router.post("/restaurant/branches" ,async(req,res)=>{
    //REQ.BODY IS RECIEVING DATA IN OBJECT FORMAT
        try {
            console.log(req.body.name);
            console.log(req.body.id);
            const branchesData = await Branches.find({city:req.body.name , p_id:req.body.id});
                console.log("data is "+ branchesData);
                res.send({
                    status:"ok" ,
                    branches:branchesData
                });
            
        } catch (error) {
            console.log("Error ocured fetching restaurant branches : " + error);
            res.send({
                status:"error",
                message:"Error ocured fetching restaurant branches!**"
            });
        }
    })
module.exports = router;