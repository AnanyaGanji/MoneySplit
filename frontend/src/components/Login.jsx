import React, { useState } from "react"; //useState give ur component memory...using for our inputs in this code
import axios from "axios"; //required to interact with the backend...using to send a post request to the backend for the login credentials
import "../styles/SignUp.css"; 

const Login = () => { //required at the start of react component
  const [message, setMessage] = useState(""); 
  /*message=login successful/invalid credendails
    setMessage=for updating the value of message
    ("")=the initail value of the setMessage is an empty string*/
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    /*formData holds an object like email and passwaord here
      setFormData is for updateing..similar to the setMessage */
  });

  const handleChange = (e) => { //known as input handler
    setFormData({ ...formData, [e.target.name]: e.target.value });//to make it work dynamically
  };
  /* e is the event triggered ie when a user types an input
     e.target.name=email or password— it comes from the name attribute of the <input>.
     e.target.value=whatever the user just typed...
     ...formData is called spread operator 
     (it helps you keep track of both email and password so you don’t lose the other one...works in key value pairs).
*/

  const handleSubmit = async (e) => { //submit handler
    e.preventDefault();//prevent reloading of the page when submitted the inputs..without it we can use the app state
    try {
      const res = await axios.post( //await helps to pause the code util the request is complete ie post is the request here and a request is usually followed by a response
        "http://localhost:5000/auth/login", // Ensure this endpoint exists in your backend
        formData //axios.post(URL, DATA) sends the form data (as JSON) to your backend.
      );

      if (res.status === 200) { //200 = OK..ie success
        setMessage("Login successful!"); //set the message for the const [message, setMessage] = useState("");...updation
        // Handle successful login (e.g., redirect or store token)
      }
    } catch (err) { //helps not to crash the app
      if (err.response && err.response.data.message) {
        setMessage(err.response.data.message); // from backend logic we get it
      } else {
        setMessage("Login failed. Please try again.");
      }/* err.response = {
          status: 401,
          data: {
          message: "Invalid email or password"
          }
          }
here...
err.response → the full response from the server
err.response.data → the body of the response (usually JSON)
err.response.data.message → a specific field that contains a human-readable error message*/
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    {/* creates a form and form wraps everything to show all the elements are from the same form... */}
    <input
    type="email" // used to validate if the input is in the email format
    name="email" // links to formData.email
    placeholder="Email" // to show Email before entering anything into the input field
    onChange={handleChange} // to update my useState..we have a function called that in the main code 
    required // means input must be filled in ie it's compulsory
    />
    <input
    type="password" // works exactly the same way as email but hides input..password is a HTML feature that automatically hides the characters
    name="password"
    placeholder="Password"
    onChange={handleChange}
    required
    />
    <button type="submit">Log In</button>
    {/* triggers the onSubmit event for the form */}
    {message && (
    <p style={{ color: message.includes("failed") ? "red" : "green" }}>
    {message}
    {/* Only shows the <p> if message is not empty. */}
    </p>
    )}
    </form>
    )
  };
    export default Login; // makes the component available for use in other files like App.js
    
