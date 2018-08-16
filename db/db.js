const mongoose = require('mongoose');

const Exercise = require("../models/exercise.js");
const ExerciseData = require("../models/exerciseData.js");

// create our db and connect
// ****Greyed this out afterwards***
// mongoose.connect('mongodb://localhost/project2');


const mongoUri = process.env.DATABASE_URL || 'mongodb://localhost:27017/project_2_session_test';
mongoose.connect(mongoUri);



mongoose.connection.on('connected', () => {
  console.log('Beyonce is here yall!');
});

mongoose.connection.on('error', (err) => {
  console.log(err, 'Beyonce is not ready to perform');
});

// Exercise.collection.insertMany(ExerciseData, (err, data) => {
// 	console.log("added exercises");
// 	mongoose.connection.close();
// });

mongoose.connection.on('disconnected', () => {
  console.log('Beyonce out!');
});
