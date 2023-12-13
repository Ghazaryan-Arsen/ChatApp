import React, { useState, useEffect } from "react";
import ChatBox from "../components/ChatBox";
import ChatList from "../components/ChatList";

const ChatRoom = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="flex">
      {/* <ChatList selectedUser={selectedUser} setSelectedUser={setSelectedUser} /> */}
      <ChatBox />
    </div>
  );
};

export default ChatRoom;
