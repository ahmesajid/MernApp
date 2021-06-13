var express = require("express")
var router = express.Router();
const Issues = require('../models/issue');
router.post("/issue/post" ,async(req,res)=>{
    //REQ.BODY IS RECIEVING DATA IN OBJECT FORMAT
    try {
        console.log(req.body.description);
        const prevCount = await Issues.countDocuments();
        const issue = new Issues(req.body); 
        const postedIssue = await issue.save();
        const currentCount = await Issues.countDocuments();

        //CONSOLE
        console.log(postedIssue);
        console.log(prevCount);
        console.log(currentCount);
        //CONSOLE ENDS

        if(prevCount+1===currentCount){
            res.send({status:1,message:`ISSUE : ${req.body.description} added.`});
        }
        else{
            console.log("Database did not updated posting an issue!")
            res.send({status:-1,message:"Issue not added in database!"});
        }
        
    } catch (error) {
        console.log("Error occured posting an issue : " + error);
        res.send({
            status:0,
            message:"Error occured posting an issue "
        });
    }
    })
router.delete("/issue/deleteAll" ,async (req,res)=>{
 //REQ.BODY IS RECIEVING DATA IN OBJECT FORMAT
 try {
    const isAnyIssue = await Issues.countDocuments({}); 
    console.log(isAnyIssue);
    if(isAnyIssue){
        await Issues.remove();     
        console.log("Deleted all issues!");
        res.send({status:1,message:"Deleted all issues"});
    }
    else{
        console.log("Issues already empty!")
        res.send({status:2});
    }
} catch (error) {
    console.log("Error occured deleting all issues : " + error);
    res.send({
        status:0,
        message:"Error occured deleting all issues!**"
    });
}
})
module.exports = router;