import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import { AdminRouter } from './Routes/Admin.js'
import cors from 'cors'
import { UserRouter } from './Routes/users.js'
import { UserRouter2 } from './Routes/users2.js'
import { jobsRouter } from './Routes/jobs.js'
import { appliedRouter } from './Routes/applied.js'
dotenv.config()

const app= express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(cookieParser())

app.use('/Admin',AdminRouter)
app.use('/auth/users',UserRouter)
app.use('/auth/user2',UserRouter2)
app.use('/jobs/jobs',jobsRouter)
app.use('/apply/applies',appliedRouter)


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Success db connection')
    app.listen(process.env.PORT,()=>{
        console.log(`server is running ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log('error connecting to db: ' +err)
})
