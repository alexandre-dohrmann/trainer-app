const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const Exercise = require("../models/exercise.js");
const Workout = require("../models/workout.js");




//Landing page route
router.get('/', async (req, res)=>{
  try  {
    const foundUser = await User.find({});
    const foundWorkout = await Workout.find({});
      res.render('workout/index.ejs', {
        user: foundUser,
        username: req.session.username,
        workout: foundWorkout,
      });
  } catch (err){
    res.send(err);
  }
})

//Create Route
router.post("/",(req, res) => {
  Workout.create({
                  name: req.body.name, 
                  category: req.body.category,
                  trainingPhase: req.body.trainingPhase, 
                  sets: req.body.sets,
                  reps: req.body.reps, 
                  exercises: []//i just changed this 7/25 6pm
                }, (err, createdWorkout) => {
                  if (err){
                    console.log(err)
                    res.send(err)
                }else{
                  console.log(createdWorkout)
                  req.session.currentWorkout = createdWorkout
                  res.redirect("/workout");
                }
});
});  

//NEW route
router.get('/new', async (req, res)=>{
  try  {
    const foundUser = await User.find({});
    const foundWorkout = await Workout.find({});
      res.render('workout/new.ejs', {
        user: foundUser,
        username: req.session.username,
        workout: foundWorkout,
      });
  } catch (err){
    res.send(err);
  }
})

//Edit Route
router.get("/:id/edit", async (req, res) => {
  try {
    const foundWorkout = await Workout.findById(req.params.id);
    res.render("workout/edit.ejs", {
      workout: foundWorkout,
      username: req.session.username
    });
  }catch (err){
    res.send(err);
  }
});



//Show Route--detailed page
router.get('/:id/show', async (req, res)=>{
  try  {
    const foundUser = await User.find({});
    const foundWorkout = await Workout.findById(req.params.id);
    const foundExercise = await Exercise.findById(req.params.id);
    req.session.workout = foundWorkout
      console.log(foundWorkout + "this is foundWorkout")//this happens
      console.log(req.params.id + "this is req.params")//this happens
      res.render('workout/show.ejs', {
        user: foundUser,
        username: req.session.username,
        workout: foundWorkout,
        exercise: foundExercise
        //DO WE NEED TO HAVE EXERCISE REPRESENTED HERE TO HAVE THE EXERCISES POPULATE?
      });
  } catch (err){
    res.send(err);
  }
})

//Update Route
router.put("/:id", (req, res) => {
  Workout.findByIdAndUpdate(req.params.id, 
                            {name: req.body.name, 
                            category: req.body.category,
                            trainingPhase: req.body.trainingPhase, 
                            sets: req.body.sets,
                            reps: req.body.reps, 
                            exercises: []},
  {new: true}, (err, updatedWorkout) => {
      if(err){
        res.send(err);
      }else{
      console.log(updatedWorkout, "this is the updatedWorkout");
      res.redirect("/workout");
      }
  });
});


// Find & Delete workout
//send workout's deleted exercise to the deleted workout's exercise property
//remove exercise object from deleted workout collection
router.delete("/:id", (req, res) => {
  Workout.findByIdAndRemove(req.params.id, (err, deletedWorkout) => {
    console.log(deletedWorkout, " this is deletedWorkout");
    
      res.redirect("/workout")
    });
  });

module.exports = router;