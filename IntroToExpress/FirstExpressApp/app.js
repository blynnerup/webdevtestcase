var express = require("express");
var app = express();

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

app.get("*", function(req, res){ // * gets catches all gets to undefined pages and leads them here..
   res.send("YOU ARE A STAR!") 
});;

// Tell Express to listen for requests (start server)

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
}); // env = environment