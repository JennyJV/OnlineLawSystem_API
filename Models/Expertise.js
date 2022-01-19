const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ExpertiseSchema = new Schema({
  expertise: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('Expertise', ExpertiseSchema, 'Expertise');