const user = require("../models/user");
const UserTodo = require("../models/task");
const { deletefile } = require("../utils/mail");
const { sendScuccess, sendError } = require("../utils/helper");
const messages = require("../utils/sucessmessage");
const statusCode = require("../utils/statuscode");
const {errormessages} = require("../utils/errormessages");
const item_per_page =1

exports.createTodo = async (req, res) => {
   try {
      const { task } = req.body
      const image = req.file
      const todo = new UserTodo({
         task: task,
         image: image.path,
         owner: req.user
      })

      await todo.save()

      // console.log(image, task);
      // res.status(i18n.__("CREATE_TASK_STATUS")).send(i18n.__('CREATE_TASK_USER'))
       sendScuccess(res,messages.CREATE_TASK_USER,statusCode.CREATE)
      // res.status(201).res.__('CREATE_USER')
   } catch (e) {
      console.log(e);
   }
}

// exports.addNewTask = async (req, res) => {
   // try {
   //    const { newTask } = req.body

   //    const userdata = await user.findById(req.user._id)

   //    const tododata = await userTodo.findOne({ owner: req.user._id })
   //    console.log(/data/, tododata);

   //    tododata.task.push({
   //       Todotask: newTask
   //    })
   //    await tododata.save()
   //    res.json(200).json({ message: "your new task is added!" })
   // } catch (e) {
   //    console.log(e);
   // }
// }

exports.getTasks = async (req, res) => {
   try{
      page = req.query.page ||1
      const user = await UserTodo.find({ owner: req.user._id }).skip((page-1)*item_per_page).limit(item_per_page)
      console.log(user);
      sendScuccess(res,user,statusCode.SUCCESS)
      // res.status(200).json({user:user})
   }catch(e){
      console.log(e);
   }
}
exports.getTaskById = async (req, res) => {
   try{
      const TaskId = req.params.taskid
      const task = await UserTodo.findById(TaskId)
      console.log(/t/, task);
      sendScuccess(res,task,statusCode.SUCCESS)

      // res.status(200).json({task})
   }catch(e){
      console.log(e);
   }

}
exports.serchdata= async (req,res)=>{
   try{
      date=req.params.key
      console.log(date);
      const userDate = new Date(date)
      console.log( userDate);
      newdate  = new Date(userDate.getFullYear(),userDate.getMonth(),userDate.getDate()+1)   
      const data = await UserTodo.find({ 
         date:{$gte: userDate.toISOString()
            ,$lte:newdate}
         })
         sendScuccess(res,data,statusCode.SUCCESS)

         // res.status(200).json({data})
      }catch(e){
         console.log(e);
      }
}

exports.getlatesttask =async (req,res)=>{
   try{
      const latestTask =await UserTodo.find({owner:req.user._id}).sort({createdAt:-1})
      console.log(latestTask);
      sendScuccess(res,latestTask,statusCode.SUCCESS)

      // res.status(200).json({latestTask})
   }catch(e){
      console.log(e);
   }
}
exports.updateTask = async (req, res) => {
   try {
      const updatedId = req.params.taskid
      console.log(updatedId);
      const updatedtask = req.body.task
      console.log(req.body);
      const image = req.file
      console.log(/i/,image);

      const usertask = await UserTodo.findById(updatedId)
      console.log(/task/, usertask);
      usertask.task = updatedtask
      if (image){
         deletefile(usertask.image)
         usertask.image = image.path
      }
      await usertask.save()
      //   res.status(201).send(res.__('CREATE_USER'))
      sendScuccess(res,messages.UPDATE_TASK,statusCode.SUCCESS)

      // res.status(200).send(res.__("UPDATE_TASK"))
   }catch(e){
      console.log(e);
   }
   
}

exports.deleteTask = async (req, res) => {
   try{
      const TaskId = req.params.taskid
      const task = await UserTodo.findById(TaskId)
      if(!task){
         return sendError(res,errormessages.TASKID_NOT_FOUND,statusCode.ERRORCODE)
      }
      deletefile(task.image)
      const deletedtask = await UserTodo.findByIdAndRemove(TaskId)
      console.log(/t/, task)
      sendScuccess(res,deletedtask,statusCode.SUCCESS)

      // res.status(200).json(deletedtask)
   }catch(e){
      console.log(e);
   }
}
