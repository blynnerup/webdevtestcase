var express = require("express"),
    app = express(),
    bParser = require("body-parser"),
    sanitizer = require("express-sanitizer"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose");
    
mongoose.connect("mongodb://localhost/discography");
app.set("view engine", "ejs");
app.use(bParser.urlencoded({extended: true}));
app.use(sanitizer());
app.use(methodOverride("_method"));
app.use(express.static("public"));

// Schema
var albumSchema = new mongoose.Schema({
    title: String,
    image: String, // In case of no image added could do: {type: String, default: "placeholder.url"}
    year: String,
    // created: {type: Date, default: Date.now}
});

var Album = mongoose.model("Album", albumSchema);

var artistSchema = new mongoose.Schema({
    name: String,
    image: String,
    genre: String,
    description: String
});

var Artist = mongoose.model("Artist", artistSchema);

// Clear the Artists collection
// Artist.remove({}, function(err){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("Artists removed");
//     }
// });

// Artist.create({
//     name: "Kreator",
//     image: "http://www.metalblast.net/wp-content/uploads/2012/10/157_photo.jpg",
//     genre: "Thrash Metal",
//     description: "Kreator is a German thrash metal band from Essen. Their style of music is similar to that of their compatriots Destruction, Sodom and Tankard; along with those three bands, Kreator has been referred to as one of the \"big 4\" of Teutonic thrash metal, and they are often credited with helping pioneer death metal and black metal by containing several elements of what was to become those genres. They originally performed a speed metal style with Venom influences. Kreator's work began in the vein of thrash metal but ventured into industrial metal and gothic metal from 1992 to 1999, before eventually returning to their classic thrash sound. The band has achieved worldwide sales of over two million units for combined sales of all their albums, making them one of the best-selling German thrash metal bands of all time"
// });

// Artist.create({
//     name: "Obituary",
//     image: "data:image/jpeg;base64,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",
//     genre: "Death Metal",
//     description: "YEAH!"
// });

// Artist.create({
//     name: "Emperor",
//     image: "http://www.metalinjection.net/wp-content/uploads/2012/02/Emperor.jpg",
//     genre: "Black Metal",
//     description: "Emperor is a Norwegian black metal band formed in 1991, regarded as highly influential by critics and emerging black metal bands. The group disestablished in 2001, but reunited from 2005 to 2007 for a few festival dates and brief US tours, and again reunited in 2013 to 2014. The group was founded by Ihsahn (guitar/vocals) and Samoth (then, drums).!"
// });

// Routes
// Index
app.get("/", function(req, res){
    res.redirect("/discography");
});

app.get("/discography", function(req, res){
    // Find all artists and sort by name (descending)..
    Artist.find().sort({ name : 1 }).exec({}, function(err, artists){
        if(err){
            console.log(err);
        } else {
            res.render("index", {artists: artists});
        }
    });
});


// New
app.get("/discography/new", function(req, res){
    res.render("new");
});


// Create
app.post("/discography", function(req, res){
    // sanitize input
    req.body.artist.description = req.sanitize(req.body.artist.description)
    // create band
    Artist.create(req.body.artist, function(err, newArtist){
       if(err){
           res.render("new");
       } else {
           // then redirect to index
           res.redirect("/discography");
       } 
   });
});

// Show
app.get("/discography/:id", function(req, res){
    Artist.findById(req.params.id, function(err, foundArtist){
        if(err){
            res.redirect("/index");
        } else {
            res.render("show", {artist: foundArtist});
        }
    });
});


// Edit
app.get("/discography/:id/edit", function(req, res){
    Artist.findById((req.params.id), function(err, foundArtist){
        if(err){
            res.redirect("/index");
        } else {
            res.render("edit", {artist: foundArtist});
        }
    })
});

// Udate
app.put("/discography/:id", function(req, res){
    Artist.findByIdAndUpdate(req.params.id, req.body.artist, function(err, updatedArtist){
        if(err){
            console.log(err);
        } else {
            res.redirect("/discography/" + req.params.id); // Could also have used updatedArtist to get the id for the redirect.
        }
    });
});

// Destroy
app.delete("/discography/:id", function(req, res){
    Artist.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/discography");
        }
    })
})

// Listen...
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server is running..");
})