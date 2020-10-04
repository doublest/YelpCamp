//require mongoose
var mongoose = require("mongoose");

//SETUP SCHEMA
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

//Define Model
module.exports = mongoose.model("Campground", campgroundSchema);
