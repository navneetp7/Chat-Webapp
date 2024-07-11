import React, { useState } from "react";
import EmailPage from "./EmailPage";
import OTPPage from "./OTPPage";
import Signup from "./Signup";

const Formpage = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");

  const nextStep = () => setStep((prevStep) => prevStep + 1);

  return (
    <>
      {step === 0 && <EmailPage setEmail={setEmail} nextStep={nextStep} />}
      {step === 1 && (
        <OTPPage email={email} setOtp={setOtp} nextStep={nextStep} />
      )}
      {step === 2 && 
        <Signup/>}
    </>
  );
};

export default Formpage;
