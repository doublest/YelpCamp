//require mongoose
var mongoose = require("mongoose");

//SETUP SCHEMA
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

//Define Model
module.exports = mongoose.model("Campground", campgroundSchema);