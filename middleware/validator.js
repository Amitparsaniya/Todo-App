const {check, validationResult} =require("express-validator")

exports.uservalidator =[
    check("name").trim().not().isEmpty().withMessage("Name is missing!"),
    check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
    check("password").trim().not().isEmpty().withMessage("Password is Missing").isLength({min:5,max:20}).withMessage("Password must be 5 to 20 charactors long!")

]

exports.passwordvalidator =[
    check("newpassword").trim().not().isEmpty().withMessage("Password is Missing").isLength({min:5,max:20}).withMessage("Password must be 5 to 20 charactors long!")
]

exports.signValidator =[
    check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
    check("password").trim().not().isEmpty().withMessage("Password is Missing").isLength({min:5,max:20}).withMessage("Password must be 5 to 20 charactors long!")
]

exports.validte =(req,res,next)=>{
    const error =validationResult(req).array()
    // console.log(/e/,error[0].msg);
    if(error.length){
        return res.json({error:error[0].msg})
    }
    next()
}