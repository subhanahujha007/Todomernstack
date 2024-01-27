import mongoose from "mongoose";

const todoschema=new mongoose.Schema({
username:{
type:String,
unique:true,
required:true
},
password:{

    type:String,
    required:true
},
email:{

    type:String,
    required:true
}
})

export const todomodel=new mongoose.model("todo",todoschema)