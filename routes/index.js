var express = require("express"),
    router = express.Router({ mergeParams: true });

// Requiring the Assignment model
var Workout = require("../models/workout")

// Default Home page route
router.get("/", function(req, res){
    res.render("index");
});

// All Assignments route
router.get("/workouts", function(req, res){
    Workout.find({}, function(err, workouts){
        if(err){
            console.log("Error");
        }
        else{
            res.render("workouts", {workouts: workouts});
        }
    });
});

// Get route for new Assignment
router.get("/workouts/new", function(req, res){
    res.render("new");
});

// Post route for new Assignment
router.post("/workouts", function(req, res){
    Workout.create(req.body, function(err, newWorkout){
        if(err){
            res.render("new");
        }
        else{
            req.flash("success", "Successfully created new Workout!")
            res.redirect("/workouts");
        }
    })
});

// Get route for specific Assignment
router.get("/workouts/:id", function(req, res){
    Workout.findById(req.params.id, function(err, findWorkout){
        if(err){
            console.log("Error");
        }
        else{
            res.render("show", {workout: findWorkout});
        }
    });
});

// Get route for edit Assignment
router.get("/workouts/:id/edit", function(req, res){
    Workout.findById(req.params.id, function(err, findWorkout){
        if(err){
            console.log("Error");
        }
        else{
            res.render("edit", {workout: findWorkout});
        }
    });
});

// Update route for an Assignment
router.put("/workouts/:id", function(req, res){
    Workout.findByIdAndUpdate(req.params.id, req.body, function(err, updateWorkout){
        if(err){
            res.redirect("/workouts");
        }
        else{
            req.flash("success", "Successfully edited the Assignment!")
            res.redirect("/workouts/" + req.params.id);
        }
    });
});

// Delete route for an Assignment
router.delete("/workouts/:id", function(req, res){
    Workout.findByIdAndRemove(req.params.id, function(err, updateWorkout){
        if(err){
            res.redirect("/workouts");
        }
        else{
            req.flash("success", "Successfully delete the Workout!")
            res.redirect("/workouts");
        }
    });
});

// Exporting the router object to be able to used in the app.js
module.exports = router;