const multer = require("multer")


const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images')
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().toString() + '-' + file.originalname)
    },
    // limits:{
    //     fileSize:1000
    // }
})



const fileFilter =(req,file,cb)=>{
    if(!file.mimetype.startsWith('image')){
       cb('supported only image file!',false)
    }else{
        cb(null,true)
    }
}

exports.storage = multer({storage:fileStorage,fileFilter:fileFilter,limits:{fileSize:100000}}).single('image')