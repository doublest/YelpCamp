var mongoose    = require("mongoose");
var Campground  = require("./models/campgrounds");
var Comment     = require("./models/comment");

//default campground data
var data = [
    {
        name: "Clouds Rest",
        image: "https://images.pexels.com/photos/4268158/pexels-photo-4268158.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus vel facilisis volutpat est velit egestas dui. Id nibh tortor id aliquet lectus. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque. Dignissim enim sit amet venenatis urna cursus eget. Pretium viverra suspendisse potenti nullam ac tortor vitae. Ornare quam viverra orci sagittis eu. Sed turpis tincidunt id aliquet. Adipiscing elit ut aliquam purus sit amet luctus. Eget aliquet nibh praesent tristique magna. Ut consequat semper viverra nam libero."
    },
    {
        name: "Tent Village",
        image: "https://cdn.pixabay.com/photo/2018/05/16/15/49/camper-3406137_1280.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus vel facilisis volutpat est velit egestas dui. Id nibh tortor id aliquet lectus. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque. Dignissim enim sit amet venenatis urna cursus eget. Pretium viverra suspendisse potenti nullam ac tortor vitae. Ornare quam viverra orci sagittis eu. Sed turpis tincidunt id aliquet. Adipiscing elit ut aliquam purus sit amet luctus. Eget aliquet nibh praesent tristique magna. Ut consequat semper viverra nam libero."
    }, 
    {
        name: "Lake House",
        image: "https://cdn.pixabay.com/photo/2017/10/07/01/01/bach-leek-2825197_1280.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus vel facilisis volutpat est velit egestas dui. Id nibh tortor id aliquet lectus. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque. Dignissim enim sit amet venenatis urna cursus eget. Pretium viverra suspendisse potenti nullam ac tortor vitae. Ornare quam viverra orci sagittis eu. Sed turpis tincidunt id aliquet. Adipiscing elit ut aliquam purus sit amet luctus. Eget aliquet nibh praesent tristique magna. Ut consequat semper viverra nam libero."
    },
    {
        name: "Beavers Creek",
        image: "https://cdn.pixabay.com/photo/2016/02/07/19/48/aurora-1185464_1280.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus vel facilisis volutpat est velit egestas dui. Id nibh tortor id aliquet lectus. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque. Dignissim enim sit amet venenatis urna cursus eget. Pretium viverra suspendisse potenti nullam ac tortor vitae. Ornare quam viverra orci sagittis eu. Sed turpis tincidunt id aliquet. Adipiscing elit ut aliquam purus sit amet luctus. Eget aliquet nibh praesent tristique magna. Ut consequat semper viverra nam libero."
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
