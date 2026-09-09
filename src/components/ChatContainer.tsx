import React, { useState } from "react";
import Image from "next/image";
import { RiSendPlaneFill } from "react-icons/ri";
import { IncomingMessage } from "http";
import moment from "moment";

const ChatContainer = ({ contactImage, contactName, status, message }: any) => {
  const [newMessage, setNewMessage] = useState("");
  const [allMessages, setAllMessages] = useState<any[]>(message);
  let totalMessage = message;
  const addNewMessageHandler = () => {
    if (newMessage === "") return;
    const date = new Date().toString();

    const incomingMessage = {
      text: newMessage,
      time: moment(new Date()).format("LTS"),
      status: "seen",
      type: "sent",
    };
    totalMessage.push(incomingMessage);
    setNewMessage("");
    return totalMessage;
  };
  const unreadMessage = totalMessage.filter(
    (item: any) => item.status === "unseen"
  );

  return (
    <div className="flex flex-col  w-2/3 min-h-[72vh] max-h-[73vh] rounded-sm">
      <div className="flex w-full gap-4 bg-white p-5">
        <div className="w-4 h-4 rounded-[50%]">
          <Image
            src={contactImage}
            className="w-full h-full object-cover rounded-[50%]"
            alt={""}
          />
        </div>
        <div className="flex flex-col">
          <div className="text-text text-sm">{contactName}</div>
          <div className="text-grey text-xs">
            {unreadMessage.length === 0
              ? "Active"
              : `${unreadMessage.length} unread messages`}
          </div>
        </div>
      </div>
      <div className="w-full flex-col gap-6 relative bg-[#f6f6fa] p-[10px] md:p-[30px] min-h-[70%] max-h-[70%] overflow-auto">
        {totalMessage?.map((item: any) =>
          item.type === "recieved" ? (
            // <div className="w-full flex justify-start items-center">
            <div
              className=" flex justify-start items-start mb-4 flex-col"
              key={item.id}
            >
              <div className=" bg-white text-grey text-sm w-1/2  p-4 rounded-md ">
                {item.text}{" "}
              </div>{" "}
              <div className="text-text text-[10px] capitalize">
                {item.time}
              </div>
            </div>
          ) : (
            // </div>
            <div
              className=" flex justify-end items-end mb-4 flex-col"
              key={item.id}
            >
              <div className=" bg-darkPurple text-textD text-sm w-1/2  p-4 rounded-md">
                {item.text}{" "}
              </div>{" "}
              <div className="text-text text-[10px] capitalize">
                {item.time}
              </div>
            </div>
          )
        )}
      </div>
      <div className="relative">
        <input
          type="text"
          name="newMessage"
          value={newMessage}
          className="w-full h-full bg-white p-5 placeholder:text-text placeholder:text-sm text-grey text-sm focus:outline-none"
          placeholder="type a message"
          onChange={(e: any) => setNewMessage(e.target.value)}
        />
        <div
          className="bg-darkPurple text-white w-8 h-8 rounded-[50%] flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 "
          onClick={addNewMessageHandler}
        >
          <RiSendPlaneFill style={{ color: "white" }} />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
