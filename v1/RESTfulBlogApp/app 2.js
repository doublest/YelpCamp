//include npm modules
var     mongoose            = require("mongoose"),
        bodyParser          = require("body-parser"),
        methodOverride      = require("method-override"),
        expressSanitizer    = require("express-sanitizer"),
        express             = require("express"),   
        app                 = express();


//app config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

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
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
    body: "HELLO THIS IS A BLOG POST!",

}); */


// RESTFUL ROUTES
app.get("/", function(req, res){
    res.redirect("/blogs");
})
//INDEX ROUTE
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
//NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
});

//CREATE
app.post("/blogs", function(req, res){
    //create blog
    console.log(req.body);
    req.body.blog.body = req.sanitize(req.body.blog.body);
    console.log("---------------");
    console.log(req.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            console.log("SOMETHING WENT WRONG CREATING A NEW BLOG");
            console.log(err);
            res.render("new");
        } else {
            //redirect to index
            res.redirect("/blogs");
        };
    });
});

//SHOW
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog})
        }
    })
})

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog:foundBlog});
        }
    });
})

//UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            res.redirect("/blogs/" + req.params.id);
        } 
    });
})

app.delete("/blogs/:id", function(req, res){
    //destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

//SERVER CHECK
app.listen(8000, function(){
    console.log("Blog App hat startet on Port 8000");
});