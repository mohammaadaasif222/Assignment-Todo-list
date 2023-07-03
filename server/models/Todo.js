const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "Plase enter product name!"],
    maxLength: 100,
  },
  description: {
    type: String,
    required: [true, "Please enter description"],
  },
  isComplete:{
   type:Boolean,
   default:false
  }, 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("todo", todoSchema);
