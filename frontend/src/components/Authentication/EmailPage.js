import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const EmailPage = ({ setEmail, nextStep }) => {
  const [emailInput, setEmailInput] = useState(""); // Initialize as an empty string
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const submitHandler = async () => {
    setLoading(true);
    if (!emailInput) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/register/step1",
        { email: emailInput },
        config
      );

      toast({
        title: "Email Submitted Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setEmail(emailInput);
      setLoading(false);
      nextStep(); // Move to the next step
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={emailInput}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmailInput(e.target.value)}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Submit
      </Button>
    </VStack>
  );
};

export default EmailPage;
