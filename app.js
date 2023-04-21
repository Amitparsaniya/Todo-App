const express =require("express")
require("./DB/db")



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
 

app.use(userrouter)
app.use(todoroutes)
// app.post("/create_todo",upload.single("image"),(req,res)=>{
//     const file  =req.file
//     console.log(file);
// })


app.listen(port,()=>{
    console.log(`your port is up on server ${port}`);
})