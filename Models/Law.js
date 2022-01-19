const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const LawSchema = new Schema({
  chapter: {
    type: String,
    required: true
  },
  ipc: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('Law', LawSchema, 'Law');