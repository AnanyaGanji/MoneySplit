const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  console.log(req.body);

  const { username, email, password } = req.body;

  try {
    // checking if the email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Hashing the password
    const hashed = await bcrypt.hash(password, 10);

    // creating a user
    const newUser = new User({
      username,
      email,
      password: hashed,
    });

    await newUser.save();

    res.status(200).json({ message: "User singup successful." });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "User signup failed." });
  }
});

module.exports = router;
