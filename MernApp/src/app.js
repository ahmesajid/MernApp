const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const path = require("path");
app.use(express.static(path.join(__dirname,'../public'))); 
const port = process.env.PORT || 8000;
require("./db/conn");
require('dotenv').config();
// const bodyParser = require("body-parser");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));

app.use(express.json());       // to support JSON-encoded bodies
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

//IMPORT ISSUE ROUTER
var issueRouter = require('./routes/issue');
app.use('/' ,issueRouter);

//IMPORT ADMIN ROUTER
var adminRouter = require('./routes/admin');
const bodyParser = require("body-parser");


app.use('/' ,adminRouter);

app.listen(port , ()=>console.log(`Server is listening at port : ${port}\n`));