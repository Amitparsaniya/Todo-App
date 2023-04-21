const express =require("express")
const { create, verifyEmail, resendEmailVerificationToken, forgetPassword, resetpassword, signIn,  } = require("../controllers/user")
const { uservalidator, validte, passwordvalidator, signValidator } = require("../middleware/validator")
const { isvalipasswordresettoken } = require("../middleware/Authuser")

const router =express.Router()

router.post("/create",uservalidator,validte,create)
router.post("/verify-email",verifyEmail)
router.post("/resend-Emailverification-token",resendEmailVerificationToken)
router.post("/forget-password",forgetPassword)
router.post("/reset-password",passwordvalidator,validte,isvalipasswordresettoken,resetpassword)
router.post("/signIn",signValidator,validte,signIn)


module.exports =router
