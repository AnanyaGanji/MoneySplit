const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    rquired: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], //to validate email
  },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
