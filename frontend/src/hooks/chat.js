import { useEffect, useRef } from "react";
import { formatDate, formatTime } from "./messageFormatter"; // Assuming the formatter is exported

const useChatSocket = (chatId, messages, setMessages) => {
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8081?chatId=${chatId}`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log(`Connected to chat ID: ${chatId}`);
    };

    socket.onmessage = (event) => {
      try {
        console.log("Received message:", event);
        const receivedMessage = JSON.parse(event.data);
        console.log("Parsed message:", receivedMessage);

        const receivedChatId = receivedMessage.chatId;

        const formattedMessage = {
          sender: receivedMessage.sender,
          message: receivedMessage.message,
          timestamp: formatTime(new Date(receivedMessage.timestamp)),
        };
        const dateKey = formatDate(new Date(receivedMessage.timestamp));

        setMessages((prevMessages) => {
          console.log(prevMessages);
          const lastDateGroup =
            prevMessages.messages[prevMessages.messages.length - 1];
          if (lastDateGroup?.date === dateKey) {
            const updatedLastDateGroup = {
              ...lastDateGroup,
              chats: [...lastDateGroup.chats, formattedMessage],
            };

            return {
              ...prevMessages,
              messages: [
                ...prevMessages.messages.slice(0, -1),
                updatedLastDateGroup,
              ],
            };
          } else {
            return {
              ...prevMessages,
              messages: [
                ...prevMessages.messages,
                { date: dateKey, chats: [formattedMessage] },
              ],
            };
          }
        });
      } catch (error) {
        console.error("Failed to parse incoming message:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, [chatId]);

  return { messages };
};

export default useChatSocket;
