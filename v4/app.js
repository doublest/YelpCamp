//add modules to app
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Campground      = require("./models/campgrounds"),
    Comment         = require("./models/comment"),
    seedDB          = require("./seeds")

//connection to the database
seedDB();
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    //retrieve all campgrouds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log("OOPS SOMETHING WENT WRONG");
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

app.post("/campgrounds", function(req, res){
    //res.send("YOU HIT THE POST ROUTE");
    //get data from form and add to array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description; 
    var newCampgrounds = {name: name, image: image, description: desc};
    //Create a new and save to the DB
    Campground.create(newCampgrounds, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});
//Route Show Page - with more detail about the campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with the provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template with the campground  
            res.render("campgrounds/show", {campground: foundCampground});
        }
    }); 
});

// =======================
// Comment Routes
// =======================

app.get("/campgrounds/:id/comments/new", function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
    //lookup campground using id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log;
            res.redirect("/campgrounds");
        }  else {
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
    //create new comment
    //connect new comment to campground
    //redirect to show page
});

app.listen(7000, function(){
    console.log("YelpCamp App hat startet on Port 7000");
});
