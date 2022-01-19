const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const LawyerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  regno: {
    type: String,
    required: true
  },
  expertise:{
    type:String,
    required:true
  }
});
module.exports = mongoose.model('Lawyer', LawyerSchema, 'Lawyer');