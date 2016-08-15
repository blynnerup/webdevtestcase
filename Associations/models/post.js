var mongoose = require("mongoose");

// Post - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

// Export can be considered the "return value" of the file when you require it. So when we require this file from another file, the export statement will return some data (otherwise we just return nothing at all).
module.exports = mongoose.model("Post", postSchema);