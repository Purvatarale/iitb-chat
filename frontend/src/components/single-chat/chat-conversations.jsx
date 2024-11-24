import { useRef, useEffect } from "react";

export default function ChatConversations({ chats }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <div
      className="w-full h-full flex flex-col-reverse gap-2 items-center overflow-y-scroll"
      ref={containerRef}
    >
      {chats.map((chat, index) => (
        <div key={index} className="flex flex-col w-full p-2">
          <span className="bg-gray-400 px-2 py-1 rounded-full max-w-max mx-auto text-gray-200 text-[10px]">
            {chat.date}
          </span>
          {chat.chats.map((message, index) => (
            <div className="flex flex-col">
              <span
                key={index}
                className={`text-md px-2 py-1 rounded-lg`}
                style={{
                  backgroundColor:
                    message.sender === "user" ? "#3b82f6" : "#f3f4f6",
                  color: message.sender === "user" ? "#fff" : "#000",
                  marginLeft: message.sender === "user" ? "auto" : "0",
                  marginRight: message.sender === "user" ? "0" : "auto",
                }}
              >
                {message.message}
              </span>
              <span
                className="text-[10px] text-gray-400"
                style={{
                  marginLeft: message.sender === "user" ? "auto" : "0",
                  marginRight: message.sender === "user" ? "0" : "auto",
                }}
              >
                {message.timestamp}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
