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
        port: 2525,
        auth: {
          user: "d41293005f4033",
          pass: "0669f6c84c9ddd"
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