const express =require("express")
require("./DB/db")
const{I18n} = require('i18n')
const path =require("path")

const  i18n =new I18n({
    locales:['en','hi'],
    directory:path.join(__dirname,"locales"),
    defaultLocale:'en'
})

// require('dotenv').config()
const app =express()
const port =8000

const userrouter = require("./routes/user")
const todoroutes =require("./routes/user_todo")

// const fileFilter =(req,file,cb)=>{
//     if(file.mimetype==='image/jpg' || file.mimetype ==="image/png"|| file.mimetype==="image/jpeg"){
    //         cb(null,true)
//     }else{
    //         cb(null,false)
    //     }
    // }
    
    
app.use(express.json())

app.use(i18n.init)

app.use(userrouter)
app.use(todoroutes)
// app.post("/create_todo",upload.single("image"),(req,res)=>{
//     const file  =req.file
//     console.log(file);
// })


app.listen(port,()=>{
    console.log(`your port is up on server ${port}`);
})