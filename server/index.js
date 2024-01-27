import express from "express"
import dotenv from "dotenv"
import {app} from "./app.js"
import {connect} from "./database/db.js"
dotenv.config('./.env')
//mongodb connection 
connect().then(()=>{
    app.on("error",(error)=>{
        console.error(`Error  :${error}`)
    })
})


app.listen(process.env.PORT||8000,()=>{
    console.log(`server is running on port :${process.env.PORT} `)
})