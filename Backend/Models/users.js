import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username:{type:String,required:true},
  
})

const UserModel= mongoose.model("User",userSchema)

export {UserModel as User};