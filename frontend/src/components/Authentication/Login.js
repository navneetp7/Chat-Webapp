import { Button,IconButton } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { setUser } = ChatState();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields",
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
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chat");
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
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
        <FormLabel size="lg" >Webmail</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Webmail"
          onChange={(e) => setEmail(e.target.value)}
          focusBorderColor="teal.500"
          borderRadius="20"
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
            focusBorderColor="teal.500"
            borderRadius="20"
          />
          <InputRightElement width="4.5rem">
            <IconButton
              h="1.75rem"
              size="lg"
              onClick={handleClick}
              icon={show ? <ViewOffIcon /> : <ViewIcon />}
              aria-label={show ? "Hide password" : "Show password"}
              bg="transparent"
              _hover={{ bg: "transparent" }}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="teal"
        width="100%"
        mt={4}
        borderRadius="20"
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="orange"
        width="100%"
        mt={2}
        borderRadius="20"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
