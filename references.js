var mongoose = require("mongoose");
//define DB connection
mongoose.connect('mongodb://localhost:27017/blog_demo_2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

var Post = require("./models/posts");

var User = require("./models/users");

Post.create({
    title: "How to cook the best burger Pt. 4",
    content: "hghghg jgjhgjg jgjgjg"
}, function(err, post){
    User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            foundUser.posts.push(post);
            foundUser.save(function(err, data){
                if(err){
                    consol.log(err);
                } else {
                    console.log(data);
                }
            });
        }
    });
});

// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });
