import React, { useState } from "react";
import "./FormInput.css";

const FormInput = () => {
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    fullname: "",
    birthdate: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({}); // State for tracking errors

  // Helper function to check if age is at least 18
  const isValidAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });

    // Error handling logic
    const newErrors = { ...errors };

    // Username validation
    if (name === "username" && (value.length < 6 || value.length > 8)) {
      newErrors.username = "Username should include 3-8 characters";
    } else {
      delete newErrors.username;
    }

    // Email validation
    if (name === "email" && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      newErrors.email = "Enter a valid email";
    } else {
      delete newErrors.email;
    }

    // Age validation (must be at least 18 years old)
    if (name === "birthdate" && value && isValidAge(value) < 18) {
      newErrors.birthdate = "You must be at least 18 years old";
    } else {
      delete newErrors.birthdate;
    }

      // Password validation
  if (name === "password") {
    const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,16}$/;
    if (!passwordPattern.test(value)) {
      newErrors.password =
        "Password must be 6-16 characters, including at least one digit and one special character (!@#$%^&*)";
    } else {
      delete newErrors.password;
    }
  }

  // Confirm Password validation
  if (name === "confirmpassword" || (name === "password" && userInput.confirmpassword)) {
    // Check if the confirm password matches the password
    if (userInput.password !== value && name === "confirmpassword") {
      newErrors.confirmpassword = "Passwords do not match";
    } else if (userInput.confirmpassword !== value && name === "password") {
      newErrors.confirmpassword = "Passwords do not match";
    } else {
      delete newErrors.confirmpassword;
    }
  }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    // e.preventDefault();

    // Check for any errors before submission
    if (Object.keys(errors).length > 0) {
      alert("Please fix the errors before submitting");
    } else {
      alert("Form submitted successfully");
      console.log(userInput);
    }
  };

  return (
    <div className="appForm">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>

        {/* Username */}
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          value={userInput.username}
          onChange={handleInput}
        />
        <span className="error">{errors.username}</span>
        <br />

        {/* Email */}
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={userInput.email}
          onChange={handleInput}
        />
        <span className="error">{errors.email}</span>
        <br />

        {/* Fullname */}
        <label>Fullname</label>
        <input
          type="text"
          name="fullname"
          placeholder="Full name"
          required
          value={userInput.fullname}
          onChange={handleInput}
        />
        <span className="error">{errors.fullname}</span>
        <br />

        {/* Birthdate */}
        <label>Birthday</label>
        <input
          type="date"
          name="birthdate"
          required
          value={userInput.birthdate}
          onChange={handleInput}
        />
        <span className="error">{errors.birthdate}</span>
        <br />

        {/* Password */}
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={userInput.password}
          pattern="[a-zA-Z0-9!@#$%^&*]{6,16}"
          onChange={handleInput}
        />
        <span className="error">{errors.password}</span>
        <br />

        {/* Confirm Password */}
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmpassword"
          placeholder="Confirm password"
          required
          value={userInput.confirmpassword}
          onChange={handleInput}
        />
        <span className="error">{errors.confirmpassword}</span>
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormInput;
