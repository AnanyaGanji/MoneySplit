import React, { useState } from "react";
import axios from "axios";
import "../styles/SignUp.css";

const SignUp = () => {
  const [message, setMessage] = useState("");
  const [formData, SetFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    SetFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/signup",
        formData
      );

      if ((res.status = 200)) {
        setMessage("Signup successful!");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setMessage(err.response.data.message); // from backend
      } else {
        setMessage("Signup failed. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit">Sign Up</button>
      {message && (
        <p style={{ color: message.includes("failed") ? "red" : "green" }}>
          {message}
        </p>
      )}
    </form>
  );
};

export default SignUp;
