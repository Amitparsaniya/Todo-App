const mongoose =require("mongoose")
const bcrypt =require("bcrypt")
const emailverificationtokenSchema = new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    token:{
        type:String,
        required:true,    
    },
    createAt:{
        type:Date,
        expires:3600 ,
        default: Date.now
    },
})


emailverificationtokenSchema.pre("save",async function(next){
    const user =this
    if(user.isModified('token')){
        user.token =await bcrypt.hash(user.token,10)
    }
    next()
})
emailverificationtokenSchema.methods.comparetoken = async function(token){
   const user =this
   const result =await bcrypt.compare(token,user.token)
    return result
}


const EmailVerificationtoken = mongoose.model("EmailVerificationtoken",emailverificationtokenSchema)

module.exports =EmailVerificationtoken