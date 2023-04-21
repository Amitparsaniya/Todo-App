const mongoose =require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/todo_app").then(()=>{
    console.log("Db is connected successfully!");
}).catch((e)=>{
    console.log(e);
})