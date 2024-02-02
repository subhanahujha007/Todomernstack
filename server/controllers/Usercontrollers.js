import mongoose from "mongoose";
import { Asynchandler } from "../utils/Asynchandler.js";
import { todomodel } from "../models/todouser.models.js";
import { Apierrors } from "../utils/Apierrors.js";
import bcrypt from "bcrypt"
import { Apiresponse } from "../utils/Apiresponse.js";
import { Todo } from "../models/todotask.models.js";
const registerroute=Asynchandler(async(req,res)=>{
const {username,password,email}=req.body
const check=await todomodel.findOne({$or:[{username,email}]})
if(check){
 new Apiresponse("username or email already exists",400)
}

const hashedpassword=await bcrypt.hash(password,10)
const user=await todomodel.create({username,password:hashedpassword,email})
delete user.password
user.save()
return res.status(201).json(
     new Apiresponse("user registerd succesfully",200)
)
})
const loginroute=Asynchandler(async(req,res)=>{
const {username,password}=req.body
const user=await todomodel.findOne({username})
if(!user){
     new Apiresponse("user doesnt exists",400,user)
}
const ispasswordright=await bcrypt.compare(password,user.password)
if(!ispasswordright){
     new Apiresponse("password incorrect",400,user)
}
delete user.password
 return res.json(
    new Apiresponse("logged in succesfully",200,user)
)
})
const createtask=Asynchandler(async(req,res)=>{
    const {title,description,checked,userId}=req.body
        if(title==="" || description==="" ){
            throw new Apierrors("empty feilds aree not acceptable",400)
        }
        const user=await todomodel.findOne({userId})
        if(!user){
            throw new Apierrors("something went wrong with the server",500)
        }
        const task=await  Todo.create({title,description,checked,userId})
        task.save()
      return res.json(new Apiresponse("task created",200,task))  
})
const sendtask=Asynchandler(async(req,res)=>{
    const {userId}=req.body
    const task=await Todo.find({userId})
    if(!task){
        throw new Apierrors("error in fetching data",400)
    }
    
    return res.json(
        new Apiresponse("data send",200,task)
    )
})
const deleteTask=Asynchandler(async(req,res)=>{
    const {userId}=req.body
   try {
     const task=await Todo.deleteOne({userId})
     if(!task){
         throw new Apierrors("cant find task",400)
     }
     return res.json(new Apiresponse("deleted",200,task))
   } catch (error) {
    console.error(error)
    throw new Apierrors("something went wrong",500)
   }
  
})
const updateTask=Asynchandler(async(req,res)=>{
const {userid,checked}=req.body

try {
  
    const user = await Todo.findOneAndUpdate({_id:userid}, {checked} , { new: true} );
  
if(!user){
    throw new Apierrors("user not found",400)
}
await user.save()
return res.json(
    new Apiresponse("user updated sucesfully",200,{user})
)
} catch (error) {
    console.error(error)
throw new Apierrors("something went wrong",400)
}
})
export {updateTask,registerroute,loginroute,deleteTask,createtask,sendtask}