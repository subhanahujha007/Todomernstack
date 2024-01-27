import express  from "express";
import dotenv from "dotenv"
import cors from "cors"
const app=express()
dotenv.config('./.env')
app.use(cors())
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:false}))

//routes
import UserRouter from "./routes/user.routes.js"
app.use("/api/auth",UserRouter)
export {app}