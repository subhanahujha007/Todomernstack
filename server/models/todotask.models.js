import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  userid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"todo"
  },
  description: {
    type: String,
    trim: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
});

export const Todo = mongoose.model('Todotask', todoSchema);
