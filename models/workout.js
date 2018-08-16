const mongoose = require("mongoose");
const Exercise = require("./exercise");
const User = require("./users");


const workoutSchema = new mongoose.Schema({
	name: String,	
  	category: String,
  	sets: Number,
  	reps: Number,	
  	trainingPhase: String, 
  	exercises: [{type: Exercise.schema,
  				default: undefined}]

});


module.exports = mongoose.model("Workout", workoutSchema);