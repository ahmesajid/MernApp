var express = require("express")
var router = express.Router();
const Recipes = require('../models/recipe');
router.delete("/recipe/deleteAll" ,async(req,res)=>{
    //REQ.BODY IS RECIEVING DATA IN OBJECT FORMAT
    try {
        const isAnyRecipe = await Recipes.countDocuments({}); 
        console.log(isAnyRecipe);
        if(isAnyRecipe){
            await Recipes.remove();     
            console.log("Deleted all recipes!")
            res.send({status:1});
        }
        else{
            console.log("Collection already empty!")
            res.send({status:2});
        }
        
    } catch (error) {
        console.log("Error occured deleting all recipes : " + error);
        res.send({
            status:0,
            message:"Error occured deleting all recipes!**"
        });
    }
    })
router.post("/recipe/delete" ,async(req,res)=>{
    //REQ.BODY IS RECIEVING DATA IN OBJECT FORMAT
    try {
        const deletedRecipe = await Recipes.deleteMany(req.body);
        console.log(deletedRecipe);
        res.send({
            status:1
        });
        
    } catch (error) {
        console.log("Error occured deleting recipe : " + error);
        res.send({
            status:0,
            message:"Error occured deleting recipe!**"
        });
    }
    })
router.post("/recipe/add" ,async(req,res)=>{
//REQ.BODY IS RECIEVING DATA IN OBJECT FORMAT
try {
    const insertedDataObj = new Recipes(req.body);
    const insertedData = await insertedDataObj.save();
    console.log(insertedData);
    res.send({
        status:"ok"
    });
    
} catch (error) {
    console.log("Error ocured adding recipe : " + error);
    res.send({
        status:"error",
        message:"Error ocured adding recipe!**"
    });
}
})
router.post("/recipe/get" ,async(req,res)=>{
    //REQ.BODY IS RECIEVING DATA IN OBJECT FORMAT
    try {
        const recipeData = await Recipes.find({p_id:req.body.p_id});
            console.log(recipeData);
            if(recipeData.length){
                res.send({
                    status:1 ,
                    resData:recipeData
                });
            }
            else{
                res.send({
                    status:0
                });
            }
    } catch (error) {
        console.log("Error occured getting recipes : " + error);
        res.send({
            status:0,
            message:"Error occured getting recipes!**"
        });
    }
    })
module.exports = router;