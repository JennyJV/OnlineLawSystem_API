const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const DistrictSchema = new Schema({
  state: {
    type: String,
    required: true
  },
  districts: {
    type: Array,
    required: true
  }
});
module.exports = mongoose.model('StatesDistricts', DistrictSchema, 'StatesDistricts');