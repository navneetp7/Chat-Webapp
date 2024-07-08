import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function EmailInput() {
  const [email, setEmail] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Replace with your backend API endpoint
      const response = await axios.post("http://127.0.0.1:5000/api/register/step1", { email });
      if (response.data.success) {
        // Navigate to the OTP page if the email is successfully submitted
        history.push("/register/step2");
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while sending the OTP. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <div>
            <b>Email Address:</b>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email Address"
            required
            style={{
              border: "1px solid grey",
              padding: "10px",
              borderRadius: "4px",
              outline: "none",
              margin: "10px 0",
              width: "100%",
              maxWidth: "500px",
            }}
          />
        </label>
        <div className="button-container">
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmailInput;
