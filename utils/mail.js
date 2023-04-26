const nodemailer =require('nodemailer')
const cypto = require("crypto")
const fs =require("fs")

exports.generateOtp = (otp_length =6)=>{
 let otp =""
    for(let i=1;i<=otp_length;i++){
        const randomval = Math.round(Math.random()*9)
        otp += randomval
    }
    return otp
}


exports.generateMailtranspoter =()=> nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: process.env.MAIL_TRAP_PORT,
        auth: {
          user: process.env.MAIL_TRAP_USER,
          pass: process.env.MAIL_TRAP_PASS
        }
  })

exports.generateRandomBytes =()=>{
     return new Promise((resolve,reject)=>{
        cypto.randomBytes(30,(error,buff)=>{
            if(error) reject(error)
            const bufferString = buff.toString("hex")
            console.log(bufferString);
            resolve(bufferString)
        })
     })
}

exports.deletefile = (filePath)=>{
   fs.unlink(filePath,(err)=>{
     if(err){
       throw err
     }
   })
}