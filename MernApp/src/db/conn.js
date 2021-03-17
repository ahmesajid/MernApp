const mongoose = require("mongoose");
mongoose.connect(
    // "mongodb://localhost:27017/food" 
    "mongodb+srv://Db123:Db123@cluster0.gcgnq.mongodb.net/food?retryWrites=true&w=majority"
    , 
{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}
)
.then(()=> console.log("Connected to database successfully"))
.catch((e)=>console.log(`Error occured \nerror is :\n ${e}`));

// const mongoose = require("mongoose");
// const URI = "mongodb+srv://bookandeatuser:bookandeatuser@cluster0.c4jew.mongodb.net/food?retryWrites=true&w=majority"
// const connectDb = async ()=>{
//     await mongoose.connect(URI , {
//         useUnifiedTopology:true,
//         useNewUrlParser:true
//     }) ;
//     await console.log("Connected to remote");
// };

// module.exports = connectDb;