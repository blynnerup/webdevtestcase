var mongoose = require("mongoose");

// User - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
});
// Export can be considered the "return value" of the file when you require it. So when we require this file from another file, the export statement will return some data (otherwise we just return nothing at all).
module.exports = mongoose.model("User", userSchema);