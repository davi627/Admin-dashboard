import mongoose from 'mongoose'

const jobSchema= new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    location:{type:String,required:true},
    code:{type:String,required:true},
   
})

const JobModel=mongoose.model("Job",jobSchema)

export {JobModel as Job};