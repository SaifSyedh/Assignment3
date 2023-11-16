var mongoose = require("mongoose");

var workoutSchema = new mongoose.Schema({
    title: String,
    description: String,
    created: {type: Date, default: Date.now()}
});

module.exports = mongoose.model("Workout", workoutSchema);