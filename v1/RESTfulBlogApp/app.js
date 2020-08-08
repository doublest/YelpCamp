//include npm modules
var     mongoose        = require("mongoose"),
        bodyParser      = require("body-parser"),
        express         = require("express"),   
        app             = express();


//app config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//define DB connection
mongoose.connect('mongodb://localhost:27017/restful_blog_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

//definde SCHEMA
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

//compile to model
var Blog = mongoose.model("Blog", blogSchema);

//TEST ENTRY
/* Blog.create({
    title: "test blog",
    image: "https://images.unsplash.com/photo-1596878276931-02dfa8ba94a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    body: "HELLO THIS IS A BLOG POST!",

}); */


// RESTFUL ROUTES
app.get("/", function(req, res){
    res.redirect("/blogs");
})

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("SOMETHING WENT WRONG");
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});


//SERVER CHECK
app.listen(8000, function(){
    console.log("Blog App hat startet on Port 8000");
});