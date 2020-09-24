//add modules to app
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Campground      = require("./models/campgrounds"),
    seedDB          = require("./seeds")

//connection to the database
seedDB();
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));



//temp test create campground
/* Campground.create(
    {
        name: "Salmon Greek 3", 
        image: "https://d2g85s3tfaxbly.cloudfront.net/photo/camp/56436/feature_Mt_Oak_Campround-f3.jpg",
        description: "More Lorem, les ipsum, foo, barr"
    }, function(err, campground){
            if(err){
                console.log("OOOPS SOMETHING WENT WRONG");
                console.log(err);
            } else {
                console.log("Add A NEW CAMPGROUND");
                console.log(campground);
            }
}); */

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
            res.render("index", {campgrounds:allCampgrounds});
        }
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
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
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with the campground  
            res.render("show", {campground: foundCampground});
        }
    }); 
});

app.listen(7000, function(){
    console.log("YelpCamp App hat startet on Port 7000");
});