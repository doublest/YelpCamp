//require mongoose
var mongoose = require("mongoose");

//Post - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content:String
});
module.exports = Post = mongoose.model("Post", postSchema);
