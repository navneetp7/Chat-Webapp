import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const NamePage = () => {
  const [name, setName] = useState("");
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      alert(
        `Form submitted successfully!\nEmail: ${location.state.email}\nOTP: ${location.state.otp}\nName: ${name}`
      );
      // Here you would typically send the form data to the server
    } else {
      alert("Please enter your name.");
    }
  };

  return (
    <div>
      <h1>Enter Your Name</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NamePage;
