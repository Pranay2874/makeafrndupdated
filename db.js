const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, minlength: 3 },
    password: { type: String, required: true, minlength: 8 }
});

const userModel = mongoose.model("User", userSchema);
module.exports = { userModel };