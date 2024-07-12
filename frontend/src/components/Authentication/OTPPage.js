import React, { useRef } from "react";
import axios from "axios";
import {
  VStack,
  HStack,
  Input,
  Button,
  useToast,
  Heading,
} from "@chakra-ui/react";

const OTPPage = ({ email, token, setToken, setOtp, nextStep }) => {
  const otpInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const toast = useToast();

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
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        console.log("Sending OTP verification request:", { otp, config });

        const response = await axios.post(
          "/api/user/register/step2",
          { otp },
          config
        );

        console.log("Received response:", response);

        if (response.status === 200) {
          const { token: newToken } = response.data;

          setOtp(otp);
          setToken(newToken); // Update the token
          localStorage.setItem("userToken", newToken);

          nextStep();
        } else {
          toast({
            title: "Invalid OTP",
            description: "Please try again.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        toast({
          title: "Error Occurred",
          description: error.response?.data?.message || error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 4-digit OTP.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <VStack spacing="10px">
      <Heading as="h1" size="lg">
        Enter OTP
      </Heading>
      <form onSubmit={handleSubmit}>
        <HStack spacing="5px">
          {otpInputRefs.map((ref, index) => (
            <Input
              key={index}
              type="text"
              maxLength="1"
              ref={ref}
              onChange={(e) => handleChange(e, index)}
              textAlign="center"
              width="50px"
            />
          ))}
        </HStack>
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </VStack>
  );
};

export default OTPPage;
