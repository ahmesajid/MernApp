const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const path = require("path");
app.use(express.static(path.join(__dirname,'../public'))); 
const port = process.env.PORT || 8000;
require("./db/conn");
const bparser = require("body-parser");

app.use(bparser.json());   
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(express.urlencoded({
    extended: true
}))

// IMPORT RESTAURANTS ROUTER
var restaurantRouter = require('./routes/restaurant')
app.use('/' , restaurantRouter);

//IMPORT RECIPES ROUTER
var recipeRouter = require('./routes/recipe');
app.use('/' ,recipeRouter);

// IMPORT DEVELOPER ROUTER
var developerRouter = require('./routes/developer')
app.use('/' , developerRouter);

//IMPORT BRANCH ROUTER
var branchRouter = require('./routes/branch');
app.use('/' ,branchRouter);

//IMPORT ADMIN ROUTER
var adminRouter = require('./routes/admin');
app.use('/' ,adminRouter);

app.listen(port , ()=>console.log(`Server is listening at port : ${port}\n`));