const mongoose =require("mongoose")
require('dotenv').config()

// const database= process.env.DB
mongoose.connect(process.env.DB).then(()=>{
    console.log("Db is connected successfully!");
}).catch((e)=>{
    console.log(e);
})