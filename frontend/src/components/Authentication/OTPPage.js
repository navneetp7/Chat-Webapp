import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OTPPage = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp) {
      navigate("/name", { state: { ...location.state, otp } });
    } else {
      alert("Please enter the OTP.");
    }
  };

  return (
    <div>
      <h1>Enter OTP</h1>
      <form onSubmit={handleSubmit}>
        <label>
          OTP:
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default OTPPage;
