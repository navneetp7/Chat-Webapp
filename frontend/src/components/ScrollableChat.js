import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import { format, isSameDay } from "date-fns"; // Import necessary functions from date-fns
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  let lastMessageDate = null;

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => {
          const messageDate = new Date(m.createdAt);
          const showDate =
            !lastMessageDate || !isSameDay(lastMessageDate, messageDate);
          lastMessageDate = messageDate;

          return (
            <div key={m._id}>
              {showDate && (
                <div
                  style={{
                    textAlign: "center",
                    margin: "10px 0",
                    fontSize: "0.9em",
                    color: "gray",
                  }}
                >
                  {format(messageDate, "PP")}
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {(isSameSender(messages, m, i, user._id) ||
                    isLastMessage(messages, i, user._id)) && (
                    <Tooltip
                      label={m.sender.name}
                      placement="bottom-start"
                      hasArrow
                    >
                      <Avatar
                        mt="7px"
                        mr={1}
                        size="sm"
                        cursor="pointer"
                        name={m.sender.name}
                        src={m.sender.pic}
                      />
                    </Tooltip>
                  )}
                  <span
                    style={{
                      backgroundColor: `${
                        m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                      }`,
                      marginLeft: isSameSenderMargin(messages, m, i, user._id),
                      marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                      borderRadius: "10px",
                      padding: "5px 15px",
                      maxWidth: "75%",
                    }}
                  >
                    {m.content}
                    <div
                      style={{
                        alignSelf:"flex-end",
                        fontSize: "0.7em",
                        color: "gray",

                      }}
                    >
                      {format(messageDate, "p")}
                    </div>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
