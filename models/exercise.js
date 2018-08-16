const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: {type: String},
  photo: {type: String},
  video: {type: String},
  description: {type: String},
});


module.exports = mongoose.model("Exercise", exerciseSchema);