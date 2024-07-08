import React, { useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import "../../App.css";

const OTPPage = () => {
  const otpInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const history = useHistory();
  const location = useLocation();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && index < otpInputRefs.length - 1) {
      otpInputRefs[index + 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = otpInputRefs.map((ref) => ref.current.value).join("");
    if (otp.length === 4) {
      try {
        // Replace with your backend API endpoint
        const response = await axios.post(
          "/api/user/registerUser2",
          {
            otp,
            ...location.state,
          }
        );
        if (response.data.success) {
          history.push("/signup", { ...location.state, otp });
        } else {
          alert("Invalid OTP. Please try again.");
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        alert("An error occurred while verifying the OTP. Please try again.");
      }
    } else {
      alert("Please enter the 4-digit OTP.");
    }
  };

  return (
    <div className="container1">
      <h1><b>Enter OTP</b></h1>
      <form onSubmit={handleSubmit}>
        {otpInputRefs.map((ref, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            className="otp-input"
            ref={ref}
            onChange={(e) => handleChange(e, index)}
          />
        ))}
        <div>
          <button className="blue-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default OTPPage;
