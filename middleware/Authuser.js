const { isValidObjectId } = require("mongoose")
const Passwordresettoken = require("../models/passwordresettoken")
require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require("../models/user")

exports.isvalipasswordresettoken = async (req, res, next) => {
   const { userId, token } = req.body


   //   token  =req.headers?.Aauthorization
   if (!isValidObjectId(userId) || !token.trim()) {
      return res.status(401).json({ error: "Invalid request!" })
   }

   const resettoken = await Passwordresettoken.findOne({ owner: userId })



   if (!resettoken) {
      return res.status(401).json({ error: "Unauthorized access,Invalid token!" })
   }

   const matched = await resettoken.comparetoken(token)

   if (!matched) {
      return res.status(401).json({ error: "Unauthorized access,Invalid token!" })
   }

   req.resettoken = resettoken
   console.log(resettoken, /id/);
   next()
}

exports.isAuth = async (req, res, next) => {
   try {
      const token = req.headers?.authorization

      if (!token) {
         return res.status(401).json({ error: "Unauthorized access,Invalid token!" })
      }

      const jwttoken = token.split('Bearer ')[1]

      const decodetoken = jwt.verify(jwttoken, process.env.SECRET_KEY)
      console.log(/decode/,decodetoken);
      const { userId } = decodetoken

      const user = await User.findById(userId)

      if (!user) {
         return res.status(401).json({ error: "Unauthorized access,Invalid user!" })
      }

      req.user = user
      next()
   }catch(e){
      console.log(e);
   }
}