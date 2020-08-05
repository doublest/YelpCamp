var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose")

//array wih default campgrounds
var campgrounds = [
    {name: "Salmon Greek", image: "https://d2g85s3tfaxbly.cloudfront.net/photo/camp/56436/feature_Mt_Oak_Campround-f3.jpg"},
    {name: "Granite Hill", image: "https://d2g85s3tfaxbly.cloudfront.net/photo/camp/18447/feature_Silver_Lake-f3.jpg"},
    {name: "Mountain Goats's Rest", image: "https://d2g85s3tfaxbly.cloudfront.net/photo/camp/146125/feature_Tuttletown_Recreation_Area-f1.jpg"},
    {name: "Salmon Greek", image: "https://d2g85s3tfaxbly.cloudfront.net/photo/camp/56436/feature_Mt_Oak_Campround-f3.jpg"},
    {name: "Granite Hill", image: "https://d2g85s3tfaxbly.cloudfront.net/photo/camp/18447/feature_Silver_Lake-f3.jpg"},
    {name: "Mountain Goats's Rest", image: "https://d2g85s3tfaxbly.cloudfront.net/photo/camp/146125/feature_Tuttletown_Recreation_Area-f1.jpg"},
    {name: "Salmon Greek", image: "https://d2g85s3tfaxbly.cloudfront.net/photo/camp/56436/feature_Mt_Oak_Campround-f3.jpg"},
    {name: "Granite Hill", image: "https://d2g85s3tfaxbly.cloudfront.net/photo/camp/18447/feature_Silver_Lake-f3.jpg"},
    {name: "Mountain Goats's Rest", image: "https://d2g85s3tfaxbly.cloudfront.net/photo/camp/146125/feature_Tuttletown_Recreation_Area-f1.jpg"},
]

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.post("/campgrounds", function(req, res){
    res.send("YOU HIT THE POST ROUTE");
    //get data from form and add to array
    var name = req.body.name;
    var image = req.body.image;
    var newCampgrounds = {name: name, image: image};
    campgrounds.push(newCampgrounds);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
})

app.listen(7000, function(){
    console.log("YelpCamp App hat startet on Port 7000");
});