var express = require("express");
var app = express();

/*
* Routes ordering matters
* First route to match a request, triggers and then no other is run!
* Do not place the CATCH ALL FIRST!
*/

// "/" => "Hi there!;
app.get("/", function(req, res){ //request and response
    res.send("Hi there!");
});
// "/bye" => "Goodbye"
app.get("/bye", function(req, res){
    res.send("Goodbye!");
});
// "/dog" => "MEOW!"
app.get("/dog", function(req, res){
    console.log("Someone made a request to /dog!");
   res.send("MEOW!"); 
});

// routing patterns - : indicates a variable, only valid till the next /
app.get("/r/:subredditName", function(req, res){
    console.log(req.params);
    var subreddit = req.params.subredditName;
    res.send("WELCOME TO THE " + subreddit.toUpperCase() +" SUBREDDIT!");
});

app.get("/r/:subredditName/comments/:id/:title/", function(req, res) {
    console.log(req.params);
    res.send("Item");
});

// Catch all routes
app.get("*", function(req, res){ // * catches (catch all routes) all gets to undefined pages and leads them here..
   res.send("YOU ARE A STAR!");
});

// Tell Express to listen for requests (start server)

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
}); // env = environment