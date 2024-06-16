import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "../global.css";

const SignUp = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const navigate = useNavigate(); 

  // Function to handle user sign up
  const handleSignUp = async () => {
    try {
      // Use Firebase Auth API to create user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      // Alert user about successful registration
      alert("Registration successful!");
      // Redirect user to login page after successful registration
      navigate("/login");
    } catch (error) {
      // Alert user if there's an error during registration
      alert(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <p>
        Already have an account? <Link to="/login">Log in here</Link>
      </p>
    </div>
  );
};

export default SignUp;
