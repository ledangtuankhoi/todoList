const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const Card = new Schema({ 
  title: String,
  body: String, 
  startTime: Date,
  endTime: Date,  
  repeat: {
    day: {type: Boolean, default: false},
    week: {type: Boolean, default: false},
    month: {type: Boolean, default: false},
  }
},{
    timestamps: true
});

module.exports =  mongoose.model('Cards', Card);