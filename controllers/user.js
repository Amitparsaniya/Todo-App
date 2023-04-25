
const { isValidObjectId } = require("mongoose")
const EmailVerificationtoken = require("../models/emailverificationotp")
const jwt =require("jsonwebtoken")
const {I18n} =require('i18n')
require('dotenv').config()
const User = require("../models/user")
const { generateOtp, generateMailtranspoter, generateRandomBytes } = require("../utils/mail")
const Passwordresettoken = require("../models/passwordresettoken")
const { CREATE_NEW_USER } = require("../locales/en")

exports.create = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const olduser = await User.findOne({ email })
        if (olduser) {
            return res.status(401).json({ error: "Email is allready exsist!" })
        }
        const user = new User(req.body)
        await user.save()


        let otp =generateOtp()
         console.log(otp);

         const emailtoken = new EmailVerificationtoken({
            owner:user._id,
            otp:otp
         })

         await emailtoken.save()
          

         var transport = generateMailtranspoter()
         transport.sendMail({
            from:"verification@otp.gmail.com",
            to:user.email,
            subject: 'Email Verification',
            html:`
            <p>Your Verification OTP</p>
            <h1>${otp}</h1>`
         })

        res.status(201).json({messgae:(res.__(CREATE_NEW_USER)), user: { _id: user._id, name: user.name, email: user.email } })
    } catch (e) {
        console.log(e);
        res.send(e)
    }
}

exports.verifyEmail =async(req,res)=>{
    try{
    const {userId,otp} =req.body
    
    if(!isValidObjectId(userId)){
        return res.status(401).json({error:"Invalid user!"})
    }

    const user = await User.findById(userId)

    if(!user){
       return res.status(401).json({error:"user not found!"})
    }
    
    
    if(user.isVerified){
        return res.status(401).json({error:"user is allready verified!"})
    }
    
    const token =await EmailVerificationtoken.findOne({owner:userId})
    console.log(/token/,token);
    
    if (!token) {
        res.status(401).json({ error: "token not found!" })
    }
    
    const isMatched= await token.comparetoken(otp)

    if(!isMatched){
        return res.status(401).json({error:"please submit a valid otp!"})
    }

    user.isVerified =true
    await user.save()

    await EmailVerificationtoken.findByIdAndDelete(token._id)
    
    var transport = generateMailtranspoter()

    transport.sendMail({
        from: "verfication@otp.gmail.com",
        to: user.email,
        subject: "Welcome Email",
        html: ` 
            <h1>Welcome our app ${user.name}, Thanks for chossing us! </h1>`
      })

   res.status(200).json({messgae:` ${user.name} ${res.__('USER_EMAIL_VERIFIED')}`})
    }catch(e){
        console.log(e);
    }
}

exports.resendEmailVerificationToken = async (req,res)=>{
    const {userId} =req.body

    if(!isValidObjectId(userId)){
        return res.status(401).json({error:"Invalid user!"})
    }

    const user = await User.findById(userId)

    if(!user){
       return res.status(401).json({error:"user not found!"})
    }
    
    
    if(user.isVerified){
        return res.status(401).json({error:"user is allready verified!"})
    }

    const allreadyhastoken =await  EmailVerificationtoken.findOne({owner:userId})


    if(allreadyhastoken) {
      return  res.status(401).json({ error: "Only after one hour you can send request for another token!" })
    }
    
    let otp =generateOtp()
    console.log(otp);

    const emailtoken = new EmailVerificationtoken({
       owner:user._id,
       token:otp
    })

    await emailtoken.save()
     

    var transport = generateMailtranspoter()
    transport.sendMail({
       from:"verification@otp.gmail.com",
       to:user.email,
       subject: 'Email Verification',
       html:`
       <p>Your Verification OTP</p>
       <h1>${otp}</h1>`
    })

   res.status(200).json({messgae:"verification otp sent to your emai address"})

}

exports.forgetPassword=async(req,res)=>{
    try{    
   const {email} =req.body

   if(!email){
    return res.status(401).json({error:"email is missing!"})
   }

   const user =await User.findOne({email})

   if(!user){
     return res.status(401).json({error:"user not found!"})
   }

   const allreadyhastoken =await Passwordresettoken.findOne({owner:user._id})

   if(allreadyhastoken){
    return  res.status(401).json({ error: "Only after one hour you can send request for another token!" })
    }

    const token = await generateRandomBytes()
    console.log(/t/,token)

    const passwordresettoken =new Passwordresettoken({
        owner:user._id,
        token
    })

    await passwordresettoken.save()

    const resetpasswordurl = `http://localhost:3000/reset-password?token=${token}&id=${user._id}`
     
    var transport = generateMailtranspoter()
    transport.sendMail({
       from:"security@app.gmail.com",
       to:user.email,
       subject: 'forget password link',
       html:`
       <p>Click here to reset your password</p>      
        <a href="${resetpasswordurl}">Change Password</a>`
    })

    res.status(200).json({ message: "Link sent to your register email account!" })
    }catch(e){
        res.send(e)
        console.log(e);
    }
}
exports.resetpassword= async(req,res) =>{
    const {newpassword,userId} = req.body
    if(!isValidObjectId(userId)){
      return   res.status(401).json({error:"Invalid user!"})
    }

    const user =  await User.findById(userId)

    if(!user){
      return  res.status(401).json({error:"user not found!"})
    }
     
    const matched = await user.comparepassword(newpassword)

    console.log(matched);

    if(matched){
       return res.status(401).json({ error: "New password can not same with oldpassword, plz choose different password!" })
    }

    user.password =newpassword
    await user.save()

    await Passwordresettoken.findByIdAndDelete(req.resettoken._id)

    var transport =generateMailtranspoter()

    transport.sendMail({
        from: "sequrity@app.gmail.com",
      to: user.email,
      subject: "Password Reset Successfully",
      html: ` 
      <h1>${user.name} your Password Reset Successfully</h1>
      <p>Now you can use new Password</p>`
    })

    res.status(200).json({message:"your password reset successfully!"})

}

exports.signIn= async(req,res)=>{
    try{    
    const {email,password} =req.body

    const user  = await User.findOne({email})

    if(!user){
        res.status(401).json({error:"Email or password is invalid"})
    }

    const matched = await user.comparepassword(password)

    if(!matched){
        res.status(401).json({error:"Email or password is invalid"})
    }

    const jwttoken = jwt.sign({userId:user._id},process.env.SECRET_KEY)

    res.status(200).json({message:"you suceessfully login!",
              user:{_id:user._id,name:user.name,email:user.email,token:jwttoken}
    })

}catch(e){
    console.log(e);
}


}





