// Setup Express
var express = require('express');
var app = express();

// Default page
app.get("/", function(req, res){
   res.send("Hi there, welcome to my assignment"); 
});

app.get("/speak/:creature", function(req, res) {
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof!",
        cat: "Meow",
        snake: "hissss"
    }
    var animal = req.params.creature.toLowerCase();
    var sound = sounds[animal];
    if (sound === undefined){
        sound = "nope";
    }
    res.send("The " + animal + " says '" + sound + "'");
    
});

app.get("/repeat/:str/:num", function(req, res){
   var strBuilder = "";
   for (var i = 0; i < parseInt(req.params.num); i++){
       strBuilder += req.params.str + " ";
   }
   res.send(strBuilder);
});

app.get("*", function(req, res) {
   res.send("Sorry, page not found...What are you doing with your life?"); 
});

// Listen for requests..
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Request received.."); 
});