import {
  Box,
  Center,
  Container,
  Tab,
  Flex,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/EmailPage"; // Fixed import for Signup
import EmailPage from "../components/Authentication/EmailPage";
import OTPPage from "../components/Authentication/OTPPage";

import Formpage from "../components/Authentication/Formpage";

function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chat");
  }, [history]);


  return (
    <Container maxW="8xl" centerContent mt={10}>
      <Flex justifyContent="space-between" alignItems="flex-start" w="100%">
        <Box
          flex="1"
          p={100}
          borderRadius="50"
          color="blue.50"
          position="relative"
        >
          <Text
            fontSize="4xl"
            fontFamily="Work Sans"
            align="center"
            mb={1}
            fontWeight="bold"
          >
            Welcome to ConnectChat
          </Text>
          <Text fontSize="xl" align="justify">
            Step into a world of seamless connections and vibrant conversations.
            Join now and discover a new way to connect, share, and laugh
            together. Sign up or log in to start your chat journey today!
          </Text>
        </Box>
        <Box
          mb="10em"
          flex="1"
          p={8}
          bg="lightblue"
          opacity="0.95"
          w="100%"
          borderRadius="45"
          borderWidth="1px"
          boxShadow="lg"
        >
          <Tabs isFitted variant="soft-rounded" colorScheme="cyan">
            <TabList mb="2em">
              <Tab _selected={{ color: "black", bg: "cyan.100" }}>Login</Tab>
              <Tab _selected={{ color: "black", bg: "cyan.100" }}>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Formpage />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Container>
  );
}

export default Homepage;
