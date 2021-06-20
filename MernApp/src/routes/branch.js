var express = require("express");
const app = express();
var router = express.Router();
const path = require("path");
const multer = require("multer");
//IMPORT NODE MAILER FROM NODE
const nodemailer = require("nodemailer");
const {google} = require('googleapis');

const Branches = require('../models/branch');
const Admins = require('../models/admin/branchAdmin');
const Restaurants = require('../models/restaurant');
const Reservations = require('../models/reservation');
const Recipes = require('../models/recipe');
const Recommendations = require('../models/recommendations')
const { oauth2 } = require("googleapis/build/src/apis/oauth2");
const BranchAdmin = require("../models/admin/branchAdmin");

fNames = null;
router.post("/branch/addImages", (req,res)=>
{
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
    let message=null;
    //REQ.BODY IS RECIEVING DATA IN OBJECT FORMAT
    try {
        await BranchAdmin.remove({});  
        await Branches.remove({});      
        await Recipes.remove({});     
        await Reservations.remove({});   
        await Recommendations.remove({})  
        let message = "Deleted all branches ,reservations , recipes and admins." 
        console.log(message)
        res.send({message});
    }
    catch (error) {
        message = error;
        res.send({message});
    }
    })
router.get("/branches/get" , async (req,res)=>{
    const branches = await Branches.find();
    res.send({branches});
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
        //p_id in req.body
        console.log(req.body);
        const branchData = new Branches(req.body) ;
        const getCountEmails =  await Branches.count({gmail:req.body.gmail});
        if(getCountEmails==0)
        {
            const insertedData = await branchData.save();
            const incrementRestaurantBranchesCount = await Restaurants.findOneAndUpdate({_id:req.body.p_id} , {$inc:{branches:1}}).exec((err,res)=>{
                if(err){
                    console.log(err)
                }
                else{
                    console.log("branch added and updated branches count in restaurants")
                }
            })
            console.log(incrementRestaurantBranchesCount);
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
        Branches.deleteMany({p_id:req.body.pId  , _id:req.body.bId} , (e)=>{
        console.log(e);
        });
        const decrementRestaurantBranchesCount = await Restaurants.findOneAndUpdate({_id:req.body.pId} , {$inc:{branches:-1}}).exec((err,res)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log("branch deleed and updated branches count in restaurants")
            }
        })
        console.log(decrementRestaurantBranchesCount);
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
router.delete("/reservation/delete/all" , async(req,res)=>{

    try {
        await Reservation.remove();
        res.send({
            status:"ok",
            message:"Removed all reservations successfully!!"
        });
        
    } catch (error) {
        console.log("Error ocured deleting reservations : " + error);
        res.send({
            status:"error",
            message:"Error ocured adding reservations !**"
        });
    }
    });
async function sendMail(req){
    const CLIENT_ID = '682902520971-1ihmk4qvhg4pjtu5uogfen7cso2etvio.apps.googleusercontent.com';
    const CLIENT_SECRET = 'QBZoULFxsCA69GWe1pBiqNUj';
    const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
    const REFRESH_TOKEN = '1//04ShFjcP8k-NDCgYIARAAGAQSNwF-L9IrtRf5tlGIC2BlxFb_9sTMdNpal9CCmEJa2agG-kw8aS2SmTP4mkoVolFKOkSNcInHatU';
    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
    oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN});

    const accessToken = await oAuth2Client.getAccessToken();
    //ADD NODEMAILER CODE
        // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
            type:"OAuth2",
            user: "ahmerbinsajid07@gmail.com", // generated ethereal user
            clientId:CLIENT_ID,
            clientSecret:CLIENT_SECRET,
            refreshToken:REFRESH_TOKEN,
            accessToken:accessToken
        },tls: {
            rejectUnauthorized: false
            }
    });

    // send mail with defined transport object
    let mailOptions = {
        from: 'ahmerbinsajid07@gmail.com', // sender address
        to: `${req.gmail}`, // list of receivers
        subject: "Your Reservation Has Been Made ✔", // Subject line
        html: `<b>Hello ${req.name}! \nYour reservation has been made on ${req.resDate} at ${req.resTime}.\nKindly come on time.\nBest regards,\nReservation Team</b>`, // plain text body
       
    };
    const res = await transporter.sendMail(mailOptions);
    return res;
}
router.post("/branch/add/reservation" , async(req,res)=>{
    const response = sendMail(req.body);
    try {
        const resData = new Reservations(req.body) ;
        const insertedData = await resData.save();
        res.send({
            status:1,
            message:"Your reservation has been made! A confirmation email is sent to your gmail account"
        })
    } catch (error) {
        console.log("Error ocured adding a new reservation : " + error);
        res.send({
            status:0,
            message:"Error ocured adding a new reservation !**"
        });
    }
    });
router.post("/recommendation/add" , async(req,res)=>{
    const {b_id} = req.body;
     try {
        const recData = new Recommendations({b_id});
        const insertedData = await recData.save();
        console.log(insertedData)
        res.send({status:1})
    } catch (error) {
        res.send({status:0});
    }
    });
router.get("/recommendation/branch/get" , async(req,res)=>{
     try {
        let branchData = new Array()
        const recData = await Recommendations.find();
        console.log(recData)
        console.log(recData.length)
        for (let index = 0; index < recData.length; index++) {
            const singleBranch = await Branches.findOne({_id:recData[index].b_id})
            console.log(singleBranch)
            branchData.push(singleBranch)
        }
        console.log(branchData)
        res.send({branchData , status:1})
    } catch (error) {
        res.send({status:0});
        console.log(error)
    }
    });
router.post("/recommendation/delete" ,async (req,res)=>{
    const {_id} = req.body
    console.log(_id)
     try {
        const delData= await Recommendations.deleteMany({b_id:_id})
        console.log(delData)
        res.send({status:1})
    } catch (error) {
        res.send({status:0});
        console.log(error)
    }
    });
router.get("/recommendation/get" , async(req,res)=>{
     try {
        const recData = await Recommendations.find();
        console.log(recData);
        res.send({recData,status:1})
    } catch (error) {
        res.send({status:0});
        console.log(error)
    }
    });
router.post("/reservation/get/id" , async(req,res)=>{
    
    const {id} = req.body;
    console.log(id);
    try {
        const resData = await Reservations.find({b_id:id}) ;
        console.log(resData);
        if(resData.length){    
            console.log("All the reservations fetched successfully!");
            res.send({
                status:1,
                message:"All the reservations fetched successfully!",
                reservationData:resData
            });
        }else{
            res.send({
                status:0,
                message:error,
                reservationData:null
            });
        }
        
        
    } catch (error) {
        console.log("Error ocured getting a reservations : " + error);
        res.send({
            status:0,
            message:error,
            reservations:null
        });
    }
    });
router.get("/branch/get/reservation/all" , async(req,res)=>{

    try {
        const resData = await Reservation.find() ;
        console.log(resData);
        res.send({
            status:1,
            message:"All the reservations fetched successfully!",
            reservations:resData
        });
        
    } catch (error) {
        console.log("Error ocured getting a new reservation : " + error);
        res.send({
            status:0,
            message:error,
            resData:null
        });
    }
    });

module.exports = router;
