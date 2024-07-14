import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection="column"
      alignItems="stretch"
      padding={3}
      background="white"
      width={{ base: "100%", md: "31%" }}
    >
      <Box
        paddingBottom={1}
        paddingX={3}
        fontSize={{ base: "24px", md: "24px" }}
        fontFamily="Work Sans, sans-serif"
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        fontWeight="semibold"
        borderBottom="1px solid #e2e8f0"
      >
        Chats
        <GroupChatModal>
          <Button
            fontSize={{ base: "14px", md: "16px" }}
            rightIcon={<AddIcon />}
            borderRadius="20"
            colorScheme="teal"
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        // padding={1}
        background="white"
        width="100%"
        height="100%"
        maxH="87.7vh"
        borderRadius=""
        overflowY="auto"
      >
        {chats ? (
          <Stack spacing={0.5}>
            {chats.map((chat) => (
              <Box
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                background={selectedChat === chat ? "#E8E8E8" : "white"}
                color="black"
                padding={2}
                borderRadius="lg"
                transition="background 0.3s, color 0.3s"
                _hover={{ background: "#E8E8E8" }}
              >
                <Text fontWeight="semibold" fontSize="md">
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="sm" color="gray.600">
                    <b>{chat.latestMessage.sender.name}:</b>{" "}
                    {chat.latestMessage.content.length > 50
                      ? `${chat.latestMessage.content.substring(0, 50)}...`
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
