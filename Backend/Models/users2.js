import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    }
})

const UserModel=mongoose.model("User2",userSchema)

export {UserModel as User2};