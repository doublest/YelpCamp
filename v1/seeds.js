var mongoose    = require("mongoose");
var Campground  = require("./models/campgrounds");
var comment     = require("./models/comment")

//default campground data

var data = [
    {
        name: "Clouds Rest",
        image: "https://images.pexels.com/photos/4268158/pexels-photo-4268158.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "lorem ipsum dolor"
    },
    {
        name: "Tent Village",
        image: "https://pixabay.com/get/57e6d7454e53ae14f1dc84609620367d1c3ed9e04e50774975267cd59e4fc6_340.jpg",
        description: "Beautiful view"
    }, 
    {
        name: "Lake House",
        image: "https://pixabay.com/get/54e8d7464b5bab14f1dc84609620367d1c3ed9e04e50774975267cd59e4fc6_340.jpg",
        description: "Nice House on the Lake"
    }
];


function seedDB(){
    //clear all old data out
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        };
        console.log("removed campgrounds");
       //add some new campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //add ad few comments
                    Comment.create(
                        {
                            test: "This place is great but i wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                           if(err){
                               console.log(err);
                           } else {
                            campground.comment.push(comment);
                            campground.save();
                            console.log("created new comments")
                           }
                     }
                    )
                }
            });
        });
    });


};

module.exports = seedDB;



