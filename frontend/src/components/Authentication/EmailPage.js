import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmailPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      navigate("/otp", { state: { email } });
    } else {
      alert("Please enter your email.");
    }
  };

  return (
    <div>
      <h1>Enter Your Email</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EmailPage;
