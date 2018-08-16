const mongoose = require('mongoose');




const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/trainer';


mongoose.connect(mongoUri);



mongoose.connection.on('connected', () => {
  console.log('Beyonce is here yall!');
});

mongoose.connection.on('error', (err) => {
  console.log(err, 'Beyonce is not ready to perform');
});

Exercise.collection.insertMany(ExerciseData, (err, data) => {
  console.log("added exercises");
  mongoose.connection.close();
});

mongoose.connection.on('disconnected', () => {
  console.log('Beyonce out!');
});
