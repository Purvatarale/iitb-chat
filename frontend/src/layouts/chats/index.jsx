import React, { useEffect, useState } from "react";
import GlobalLayout from "../global";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import request from "../../utils/request";

const ChatLayout = ({ children }) => {
  const [chatCategories, setChatCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await request.get("/static/get-chat-categories");
        setChatCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch chat categories:", error);
      }
    })();
  }, []);

  return (
    <GlobalLayout>
      <section className="w-screen h-screen border-2 border-red-100 overflow-hidden flex flex-col">
        <Navbar />
        <div className="flex flex-row gap-2 p-2 h-[90vh] max-h-[90vh] border-2 border-orange-100">
          <div className="basis-[30%] w-full h-[88vh] max-h-[88vh] overflow-y-scroll">
            <Sidebar chatCategories={chatCategories} />
          </div>
          <div className=" border-2 border-green-100 basis-[75%] w-full h-[88vh] max-h-[88vh] overflow-y-scroll">
            {children}
          </div>
        </div>
      </section>
    </GlobalLayout>
  );
};

export default ChatLayout;
