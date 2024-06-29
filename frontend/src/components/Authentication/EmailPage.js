import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function EmailInput() {
  const [email, setEmail] = useState("");
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Replace "/next-page" with the actual path you want to navigate to
    history.push("/otp");
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
