var express = require("express"),
    app = express(),
    bparser = require("body-parser"),
    mongoose = require("mongoose"),
    expressSanitizer = require("express-sanitizer"), // Sanitize input for <script> fields in HTML enabled fields
    methodOverride = require("method-override"); // Using this to "trick" the app into treating a PUT method as a PUT method (and not a GET)

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bparser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method")); // listen for _method in the URL - eg. <form class="ui form" action="/blogs/<%= blog._id %>?_method=PUT" method="POST"> - where the ?_method=PUT is appended to the URL

// MONGOOSE/MODE CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String, // In case of no image added could do: {type: String, default: "placeholder.url"}
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// RESTFUL ROUTES - START

// INDEX ROUTE
app.get("/", function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

// NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res){
    // sanitize input
    req.body.blog.body = req.sanitize(req.body.blog.body);
    // create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else {
            // then, redirect to the index
            res.redirect("/blogs");
        }
    });
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    }); 
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    // sanitize input
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// DESTROY ROUTE
app.delete("/blogs/:id", function(req, res){
    // destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else {
            // redirect
            res.redirect("/blogs");
        }
    });
});

// RESTFUL ROUTES - END

// Listen...
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server is running..");
})