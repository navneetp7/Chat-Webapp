import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../../App.css";

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
    <div className="container">
      <h1>
        <b>Enter Your Name</b>
      </h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <button className="blue-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NamePage;
