import { SendHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { CHAT_CATEGORIES } from "../../constants";
import useChatSocket from "../../hooks/chat";
import { Button } from "../../modules/ui/button";
import { Textarea } from "../../modules/ui/textarea";
import request from "../../utils/request";
import ChatConversations from "./chat-conversations";

export default function SingleChat({ chatId }) {
  const [initialData, setData] = useState(null);
  const [message, setMessage] = useState("");
  const { messages: data } = useChatSocket(chatId, initialData, setData);

  const fetchData = async () => {
    const res = await request.get(`/api/conversations/get-messages/${chatId}`);
    if (res.data) {
      setData(res.data);
    }
  };

  const sendMessage = async () => {
    if (!message) {
      window.alert("Please Enter a message");
    }

    try {
      const res = await request.post(`/api/conversations/messages`, {
        conversation_id: chatId,
        message,
      });
      // fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const chatCategory = data
    ? CHAT_CATEGORIES.find((chat) => chat.id == data.category)
    : null;

  useEffect(() => {
    fetchData();
  }, [chatId]);

  return (
    <div className="flex flex-col h-full bg-blue-100">
      <div className="flex flex-row gap-2 items-center px-2 w-full bg-blue-200 basis-[12.5%] rounded-t-[12px]">
        <img
          src={chatCategory?.icon}
          className="rounded-full w-[50px] aspect-square "
        />
        <div className="flex flex-col">
          <span className="font-bold">{chatCategory?.title}</span>
          <span className="text-sm">{data?.description}</span>
        </div>
        {data?.status === "closed" && (
          <Button className="ml-auto py-1 h-auto rounded-full">
            Reopen Conversation
          </Button>
        )}
        <div
          className="text-white rounded-xl px-2 capitalize"
          style={{
            marginLeft: data?.status === "open" ? "auto" : "0",
            background: data?.status === "open" ? "green" : "#cf0d0d",
          }}
        >
          {data?.status}
        </div>
      </div>
      <div className="w-full basis-[75%] max-h-[75%] overflow-y-auto">
        <ChatConversations chats={data?.messages || []} />
      </div>
      <div className="w-full basis-[12.5%] flex flex-row p-2 gap-2 bg-blue-200 rounded-b-[12px]">
        <Textarea
          placeholder="Type your message here."
          className="resize-none border-[2px] border-[#00000040]"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></Textarea>
        <Button className="h-full" onClick={sendMessage}>
          <SendHorizontal />
        </Button>
      </div>
    </div>
  );
}
