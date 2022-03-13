const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const Card = new Schema({ 
  title: String,
  body: String, 
  startDate: Date,
  endDate: Date, 
},{
    timestamps: true
});

module.exports =  mongoose.model('Cards', Card);