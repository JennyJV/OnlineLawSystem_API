const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const CourtSchema = new Schema({
  state: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  court: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('Court', CourtSchema, 'Court');