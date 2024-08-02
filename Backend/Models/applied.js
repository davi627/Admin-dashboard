import mongoose from 'mongoose'

const applySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    }
})

const ApplyModel=mongoose.model("Apply",applySchema)

export {ApplyModel as Apply};