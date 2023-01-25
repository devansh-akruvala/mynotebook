const mongoose = require('mongoose')
const { Schema } = mongoose;

const noteSchema = new Schema({
  // its like foregin key 
  user:{
    type : M=mongoose.Schema.Types.ObjectId,
    ref : 'user'
  },
  title: {
    type:String,
    required:true
  },
  desc: {
    type:String,
    required:true
  },
  tag: {
    type:String,
    default: 'General'  
},
  date: {
    type:Date,
    default: Date.now
  }

});

module.exports = mongoose.model("notes",noteSchema);