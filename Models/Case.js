const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CaseSchema = new Schema({
  caseID: {
    type: String
  },
  petitionerName: {
    type: String,
    required: true
  },
  petitionerEmail: {
    type: String,
    required: true
  },
  accusedName: {
    type: String,
    required: true
  },
  accusedAddress: {
    type: String,
    required: true
  },
  court: {
    type: String,
    required: true
  },
  lawyer: {
    type: String,
    required: true
  },
  ipc: {
    type: String,
    required: true
  },
  caseType: {
    type: String,
    required: true
  },
  casestatus:{
    type: String
  },
  year:{
    type:String
  }
});
module.exports = mongoose.model('Case', CaseSchema, 'Case');