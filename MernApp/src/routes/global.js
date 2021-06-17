var express = require("express");
var router = express.Router();
const Branch = require('../models/branch');
const Restaurant = require('../models/restaurant');
const Issue = require('../models/issue');
const Reservation = require('../models/reservation');
router.get("/counts/all" ,async(req,res)=>{
    //REQ.BODY IS RECIEVING DATA IN OBJECT FORMAT
    try {
        const reservationsCount = await Reservation.countDocuments();
        const restaurantCount = await Restaurant.countDocuments();
        const branchesCount = await Branch.countDocuments();
        const managerIssueCount = await Issue.countDocuments({isAdmin:true , isOpen:true});
        const userIssueCount = await Issue.countDocuments({isUser:true,isOpen:true});
        const openIssuesCount = await Issue.countDocuments({isOpen:true});
        const closedIssuesCount = await Issue.countDocuments({isOpen:false});
        const totalIssuesCount = openIssuesCount+closedIssuesCount;
        const openIssuesPercentage = [(openIssuesCount*100)/totalIssuesCount];
        const closedIssuesPercentage = [(closedIssuesCount*100)/totalIssuesCount];

        res.send({
            restaurantCount,
            branchesCount,
            userIssueCount,
            managerIssueCount,
            reservationsCount,
            openIssuesCount,
            closedIssuesCount,
            openIssuesPercentage,
            closedIssuesPercentage
        })

        
    } catch (error) {
        console.log("Error occured getting all counts : " + error);
        res.send({
            status:0,
            message:"Error occured getting all counts!**"
        });
    }
    })
module.exports = router;