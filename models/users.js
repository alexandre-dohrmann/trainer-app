const mongoose = require("mongoose");
const Workout = require("./workout");
const Exercise = require("./exercise");

const userSchema = new mongoose.Schema({
	name: {type: String, required: true},
	username: {type: String, required: true},
	password: {type: String, required: true},
	email: {type: String, required: true},
	phoneNumber: String,
	exercises: [Exercise.schema],
	workouts: [Workout.schema]
});

module.exports = mongoose.model("User", userSchema);
