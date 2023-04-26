const express =require("express")
require("./DB/db")
const { enTranlations } = require("./locales")
const path =require("path")


// require('dotenv').config()
const app =express()
const port =8000
 
const userrouter = require("./routes/user")
const todoroutes =require("./routes/user_todo")

    
    
app.use(express.json())


app.use(userrouter)
app.use(todoroutes)
// app.post("/create_todo",upload.single("image"),(req,res)=>{
//     const file  =req.file
//     console.log(file);
// })


app.listen(port,()=>{
    console.log(`your port is up on server ${port}`);
})