/* define connection to DB */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cat_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String,
});

var Cat = mongoose.model("Cat", catSchema);

//add a new cat to the database

/* var george = new Cat({
    name: "Mrs. Norris",
    age: 7,
    temperament: "Evil",
});

george.save(function(err, cat){
    if(err){
        console.log("SOMETHIG WENT WRONG!!")
    } else {
        console.log("WE JUST SAVED A CAT")
        console.log(cat);
    }
}); */
Cat.create({
    name: "SNOW White",
    age: 15,
    temperament: "Bland"
}, function(err, cat){
    if(err){
        console.log("OOOPS SOMETHING WENT WRONG");
        console.log(err);
    } else {
        console.log("Add A NEW CATS");
        console.log(cat);
    }
})

//retreive all cats from the DB and console.log each one
Cat.find({}, function(err, cat){
    if(err){
        console.log("OOOPS SOMETHING WENT WRONG");
        console.log(err);
    } else {
        console.log("ALL THE CATS");
        console.log(cat);
    }
})