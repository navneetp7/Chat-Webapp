import React, { useState, useRef } from "react";
import { Button, Container, Box, Avatar, IconButton } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useHistory } from "react-router";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Signup = ({ token }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useHistory();
  const [name, setName] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [picLoading, setPicLoading] = useState(false);

  const inputFileRef = useRef(null);

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !password || !confirmpassword) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords do not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const payload = {
        name,
        password,
        profilepicture: pic,
      };

      console.log("Sending registration request:", payload);

      const { data } = await axios.post(
        "/api/user/register/step3",
        payload,
        config
      );

      console.log("Received response:", data);

      toast({
        title: "Registration successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history.push("/chat");
    } catch (error) {
      console.error("Error during registration:", error.response || error);
      toast({
        title: "Error occurred!",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select an image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "mean-chatapp");
      data.append("cloud_name", "navneetp");
      fetch("https://api.cloudinary.com/v1_1/navneetp/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please select an image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="cyan."
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="0px"
      >
        <VStack spacing="5px">
          <Box textAlign="center" mb={4}>
            <Avatar
              size="xl"
              name="Pictu"
              src={pic}
              cursor="pointer"
              onClick={() => inputFileRef.current.click()}
            />
            <Input
              type="file"
              ref={inputFileRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={(e) => postDetails(e.target.files[0])}
            />
            <FormLabel
              mt={2}
              mb={0}
              cursor="pointer"
              onClick={() => inputFileRef.current.click()}
            >
              Upload Profile Pic
            </FormLabel>
          </Box>

          <FormControl id="first-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
              borderRadius="20"
              focusBorderColor="teal.500"
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                type={show ? "text" : "password"}
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                borderRadius="20"
                focusBorderColor="teal.500"
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

          <FormControl id="confirmpassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size="md">
              <Input
                type={show ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmpassword(e.target.value)}
                borderRadius="20"
                focusBorderColor="teal.500"
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
            style={{ marginTop: 15 }}
            onClick={submitHandler}
            isLoading={picLoading}
            borderRadius="20"
          >
            Sign Up
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default Signup;
