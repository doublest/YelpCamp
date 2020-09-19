var mongoose = require("mongoose");
//define DB connection
mongoose.connect('mongodb://localhost:27017/blog_demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

//Post - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content:String
});

var Post = mongoose.model("Post", postSchema);

//User email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);



// var newUser = new User({
//     email: "hermoine@hogwarts.edu",
//     name: "Hermoine Granger"
// });

// newUser.save(function(err, user){
//     if(err){
//         console.log("SOMETHING WENT WWRONG");
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// newUser.posts.push({
//     title: "How to brew ployjuice potion",
//     content: "Just kidding, go to potions class"
// });

// newUser.save(function(err, Post){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(Post);
//     }
// });

User.findOne({name: "Hermoine Granger"}, function(err, user){
    if(err) {
        //console.log(err);
    } else {
        user.posts.push({
            title: "3 Things i really hate",
            content: "Voldemort, Voldemort, Voldemort"
        });
        user.save(function(err, user){
            if(err) {
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});