const mongoose = require('mongoose')

const userTodoSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    task:{
            type:String,
            required:true
        },
    image: {
        type: String || File || Object,
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true })

userTodoSchema.methods.addToTask = async function(newTask){
    try{

        const user= this
        const updatedcartItem =[...user.task.Todotask]
        
        updatedcartItem.push({
            Todotask:newTask
        })
        
        return user.save()
    }catch(e){
        console.log(e);
    }

}

// UserSchema.methods.addToCart =function(product){
//     const user = this
//     const cartproductIndex =  user.cart.items.findIndex(cp=>{
//        return cp.productid.toString() === product._id.toString()
//     })
//     console.log(cartproductIndex);
//     let newquantity =1
//     const updatedcartItem =[...user.cart.items] 
//     console.log(/prvsitem/,updatedcartItem);
 
//     if(cartproductIndex >=0){
//        newquantity =user.cart.items[cartproductIndex].quantity +1
//        updatedcartItem[cartproductIndex].quantity =newquantity
//     }
//     else{
//        updatedcartItem.push({
//           productid: product._id,
//           quantity : newquantity
//        })         
//     }
 
//     const  updatedcart ={
//         items : updatedcartItem
//      }
 
//      user.cart = updatedcart
//      return user.save()

const userTodo = mongoose.model("UserTodo", userTodoSchema)
module.exports = userTodo