const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const Workout = require("../models/workout.js");
const Exercise = require("../models/exercise.js");

//Landing page route






//Edit Route
router.get('/profile/edit', async (req, res) => {
  try {
    const foundUser = await User.findOne({'username': req.session.username});
      res.render('user/edit.ejs', {
        user: foundUser,
        username: req.session.username,
      });
  } catch (err) {
      res.send(err)
    }
});

//SHOW Route --detailed page

router.get('/profile', async (req, res)=>{//dont touch
  try  {
    const foundUser = await User.findOne({'username': req.session.username});
    req.session.user = foundUser;
      res.render('user/show.ejs', {
        user: foundUser,
        username: req.session.username,
      });
  } catch (err){
    res.send(err);
  }
})

// Update Route
router.put("/profile", (req, res) => {
  User.findByIdAndUpdate(req.session.userId, //this is from the auth controller
                          {name: req.body.name, 
                          //usernames should NOT be editable  
                          password: req.body.password, 
                          email: req.body.email,
                          phoneNumber: req.body.phoneNumber},
    {new: true}, (err, updatedUser)=> {
      if(err){
        res.send(err);
      }else{
    console.log(updatedUser, "this is the updatedUser");
    res.redirect("/user/profile");
  }
})  
});

// router.put('/profile', (req, res) => {
//   User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedAuthor)=> {
//     console.log(updatedUser, ' this is updatedAuthor');
//     res.redirect('/profile');
//   });
// });
// ++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++
// RETURN TO THIS LATER!!!!!!!!!!
// ++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++

// Find & Delete User
//send user's deleted workouts to the deleted user's workout property
//remove workout object from deleted user collection
// router.delete("/:id", (req, res) => {
//   User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
//     console.log(deletedUser, " this is deletedUser");
//     const workoutId = [];
//     for(let i = 0; i < deletedUser.workout.length; i++){
//       workoutId.push(deletedUser.workout[i].id);
//     }

//     Workout.remove({
//       _id: { $in: workoutId}
//     }, (err, data) => {
//       res.redirect("/user")
//     });
//   });
// });

module.exports = router;