const express =require("express")
const { createTodo, addNewTask, getTasks, deleteTask, getTaskById, updateTask, serchdata, getlatesttask } = require("../controllers/user_todo")
const multer = require("multer")
const { isAuth } = require("../middleware/Authuser")
const { newTask, validate: validte, todoValidator } = require("../middleware/validator")
const { storage } = require("../middleware/multer")


const router = express.Router()

router.post("/create-todo",isAuth,storage,todoValidator,validte,createTodo)

// router.post("/addTask",isAuth,newTask,validte,addNewTask)

router.get("/task",isAuth,getTasks)
router.get("/serch/:key",isAuth,serchdata)
router.get("/findById/:taskid",isAuth,getTaskById)
router.get("/latestTask",isAuth,getlatesttask)

router.post("/updateTask/:taskid",storage,updateTask)
router.delete("/deleteTask/:taskid",isAuth,deleteTask)


module.exports= router
