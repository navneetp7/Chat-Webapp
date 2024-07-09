import { Box, Flex } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <Flex direction="column" w="100%" h="100vh">
      {user && <SideDrawer />}
      <Flex
        flex="0.97"
        justifyContent="space-between"
        p="10px"
        bg="rgba(255, 255, 255, 0.8)"
        boxShadow="lg"
        borderRadius="lg"
        m="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Flex>
    </Flex>
  );
};

export default Chatpage;


