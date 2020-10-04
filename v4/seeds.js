var mongoose    = require("mongoose");
var Campground  = require("./models/campgrounds");
var Comment     = require("./models/comment");

//default campground data
var data = [
    {
        name: "Clouds Rest",
        image: "https://images.pexels.com/photos/4268158/pexels-photo-4268158.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "lorem ipsum dolor"
    },
    {
        name: "Tent Village",
        image: "https://cdn.pixabay.com/photo/2018/05/16/15/49/camper-3406137_1280.jpg",
        description: "Beautiful view"
    }, 
    {
        name: "Lake House",
        image: "https://cdn.pixabay.com/photo/2017/10/07/01/01/bach-leek-2825197_1280.jpg",
        description: "Nice House on the Lake"
    },
    {
        name: "Beavers Creek",
        image: "https://cdn.pixabay.com/photo/2016/02/07/19/48/aurora-1185464_1280.jpg",
        description: "no beavers here"
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
                            text: "This place is great but i wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                           if(err){
                               console.log(err);
                           } else {
                            campground.comments.push(comment);
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
