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

router.post("/login", async (req, res) => { //POST route that send data for the login credentials
  /*/login runs when the POST request is made to /login
  async as we r gonna use await statments in this function
  res=we request the data from client (email and password)
  res=response we send back to client (success/error message) */
  const { email, password } = req.body;//from the body of the request email and password are pull ie data is sent from the frontend form

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });//User.findOne(...) is a MongoDB query through Mongoose...You’re saying: “Find me one user where the email field matches the given email.”
    /*User.findOne({ email }) searches the database for the email
      await pauses here until the database responds.
      if no user is found, user will be null. */
    if (!user) { //if user is null
      return res.status(400).json({ message: "Invalid email or password." });
    }//400 = bad request ie email not found ie null

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    /* bcrypt.compare() checks if the password entered by the user matches the hashed password stored in the DB
      password=raw pass that the user typed in th elogin form
      user.password=already hased and saved pass from the signup
      and password is hashed here to compare it with the stored pass*/
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }//.json to send the response in JSON which is the standard format for the APIs...
    //the frontend also expects ur response to be like this so it can read "res.data.message"

    // checks if the login is successful or not and displays the message
    res.status(200).json({ message: "Login successful." });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "User login failed." });
  }//500 = server error
});

module.exports = router;
/*exports this router so it can be used in your main server file (app.js, index.js, etc.)...this is required to make this route accessible to your app. */
