var express = require("express"),
    router = express.Router({ mergeParams: true });

// Requiring the Assignment model
var Workout = require("../models/workout")

// All Assignments route
router.get("/assignments", function(req, res){
    Workout.find({}, function(err, assignments){
        if(err){
            res.send({
                success: false,
                error: err
            });
        }
        else{
            res.send({
                success: true,
                assignments: assignments
            });
        }
    });
});

// Post route for new Assignment
router.post("/assignments", function(req, res){
    Workout.create(req.body, function(err, newassignment){
        if(err){
            res.send({
                success: false,
                error: err
            });
        }
        else{
            res.send({
                message: "Successfully Created Assignment",
                success: true,
                assignment: newassignment
            });
        }
    })
});

// Get route for edit Assignment
router.get("/assignments/:id/edit", function(req, res){
    Workout.findById(req.params.id, function(err, findassignment){
        if(err){
            console.log("Error");
        }
        else{
            res.render("edit", {assignment: findassignment});
        }
    });
});

// Update route for an Assignment
router.put("/assignments/:id", function(req, res){
    Workout.findByIdAndUpdate(req.params.id, req.body, function(err, updateassignment){
        if(err){
            res.redirect("/assignments");
        }
        else{
            req.flash("success", "Successfully edited the Assignment!")
            res.redirect("/assignments/" + req.params.id);
        }
    });
});

// Delete route for an Assignment
router.delete("/assignments/:id", function(req, res){
    Workout.findByIdAndRemove(req.params.id, function(err, updateassignment){
        if(err){
            res.redirect("/assignments");
        }
        else{
            req.flash("success", "Successfully delete the Assignment!")
            res.redirect("/assignments");
        }
    });
});

// Exporting the router object to be able to used in the app.js
module.exports = router;