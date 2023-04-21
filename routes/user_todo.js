const express =require("express")
const { createTodo } = require("../controllers/user_todo")
const multer = require("multer")
const { isAuth } = require("../middleware/Authuser")
const  fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images')
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().toString() + '-' + file.originalname)
    },
    size:(req,file,cb)=>{
        if(file.size> 50000){
            cb('file size shoud be less than 2MB')
        }else{
            cb(null,true)
        }
    }
})

const fileFilter =(req,file,cb)=>{
    if(!file.mimetype.startsWith('image')){
       cb('supported only image file!',false)
    }else{
        cb(null,true)
    }
}
// const limits = (req,file,cb)=>{
//      if(file.size>5000){
//         cb('file size shoud be less than 2MB',false)
//     }else{
//         cb(null,true)
//     }
     
// }

const storage  =  multer({storage:fileStorage,fileFilter:fileFilter,limits:{fileSize:100000}}).single('image')
// console.log(storage);

const router = express.Router()

router.post("/create-todo",isAuth,storage,createTodo)


module.exports= router
