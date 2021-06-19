var express = require("express");
var router = express.Router();
const Branch = require('../models/branch');
const Restaurant = require('../models/restaurant');
const Issue = require('../models/issue');
const Reservation = require('../models/reservation');
const Todo = require('../models/todo')
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
        var start , end , result= null;
        let reservationsCountArray = new Array();
        for (let index = 7; index >0; index--) {
            start = new Date(new Date().getTime()-(60*60*24*1000*index));
            start.setHours(0,0,0,0);
            end = new Date(new Date().getTime()-(60*60*24*1000*index));
            end.setHours(23,59,59,999);
            result = await  Reservation.countDocuments({"time": {$gte:start , $lte:end}})
            result.length?
            reservationsCountArray.push(0):
            reservationsCountArray.push(result)
        }
        res.send({
            restaurantCount,
            branchesCount,
            userIssueCount,
            managerIssueCount,
            reservationsCount,
            openIssuesCount,
            closedIssuesCount,
            openIssuesPercentage,
            closedIssuesPercentage,
            series:[{
                name:"rs-count",
                data:reservationsCountArray
            }]
        })

        
    } catch (error) {
        console.log("Error occured getting all counts : " + error);
        res.send({
            status:0,
            message:"Error occured getting all counts!**"
        });
    }
    })
router.post("/todo/post" , async (req,res)=>{
    const {todoText} = req.body 
    try {
        const newTodo = new Todo({text:todoText})
        const insertedTodo = await newTodo.save()
        console.log(insertedTodo);
        res.send({message:"to do posted"})
    } catch (error) {
        console.log(error)
        res.send({message:"error adding todo"})
    }
})
router.get("/todo/get" , async (req,res)=>{
    try {
        const todoData = await Todo.find();
        console.log(todoData)
        res.send({todoData});
    } catch (error) {
        console.log(error)
    }
})
router.post("/todo/delete" , async (req,res)=>{
    try {
        const {delId} = req.body
        console.log(delId)
        Todo.deleteMany({_id:delId} , (err)=>console.log(err))
        res.send({message:"todo deleted"});
    } catch (error) {
        res.send({message:"error deleting todo"})
        console.log(error)
    }
})

module.exports = router;