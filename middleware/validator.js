const {check, validationResult} =require("express-validator")
const { sendError } = require("../utils/helper")
const { errormessages, validation } = require("../utils/errormessages")
const statusCode = require("../utils/statuscode")

exports.uservalidator =[
    check("name").trim().not().isEmpty().withMessage("Name is missing!"),
    check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
    check("password").trim().not().isEmpty().withMessage("Password is Missing").isLength({min:5,max:20}).withMessage("Password must be 5 to 20 charactors long!")

]

exports.passwordvalidator =[
    check("newpassword").trim().not().isEmpty().withMessage("Password is Missing").isLength({min:5,max:20}).withMessage("Password must be 5 to 20 charactors long!")
]

exports.signValidator =[
    check("email").trim().not().isEmpty().withMessage("plz enter a emailId!"),
    check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
    check("password").trim().not().isEmpty().withMessage("Password is Missing").isLength({min:5,max:20}).withMessage("Password must be 5 to 20 charactors long!")
]

exports.todoValidator=[
    check("task").trim().not().isEmpty().withMessage("plz add a new Task!")
]
exports.emailverification=[
    check("otp").trim().not().isEmpty().withMessage("plz enter valid OTP!").isLength({min:6,max:6}).withMessage("OTP should be 6 charactors long"),
    check("userId").trim().not().isEmpty().withMessage("userId not found!")
]
exports.forgetpassword =[
    check("email").trim().not().isEmpty().withMessage("plz enter a emailId!"),
    check("email").normalizeEmail().isEmail().withMessage("Email is invalid!")
]

exports.validte =(req,res,next)=>{
    const error =validationResult(req).array()
    if(error.length){
        return res.json({error:error[0].msg})
    }
    next()
}