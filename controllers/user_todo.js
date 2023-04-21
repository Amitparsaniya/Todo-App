const UserTodo = require("../models/user_todo");


exports.createTodo = async(req,res)=>{
    try{
    const {task} =req.body
    
    // if(!description){
    //   return  res.send({error:"add list"})
    // }
    const image =req.file
    const temptask=[{
        Todotask:task,
    }]
    const todo = new UserTodo({
    task:temptask,
       image: image.path,
       owner:req.user
    })

    await todo.save()

    // const todo =new UserTodo({description})
    // const todo = new UserTodo(image)
    // console.log("i",image || image?.error || description);
    // res.send({messgae:image.path,description})
    // console.log(req.body);
    console.log(image,task);
    res.send("ok")
 }catch(e){
    console.log(e);
 }
}
// --------------this is only for reference----------------------------------


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
// }
 

