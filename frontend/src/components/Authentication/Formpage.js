import React, { useState } from "react";
import EmailPage from "./EmailPage";
import OTPPage from "./OTPPage";
import Signup from "./Signup";

const Formpage = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState("");

  const nextStep = () => setStep((prevStep) => prevStep + 1);

  return (
    <>
      {step === 0 && (
        <EmailPage
          setEmail={setEmail}
          setToken={setToken}
          nextStep={nextStep}
        />
      )}
      {step === 1 && (
        <OTPPage
          email={email}
          token={token}
          setOtp={setOtp}
          setToken={setToken}
          nextStep={nextStep}
        />
      )}
      {step === 2 && <Signup token={token} />}
    </>
  );
};

export default Formpage;
