import React, { useState } from "react";
import ChatBox from "../components/ChatBox";
import ChatList from "../components/ChatList";

const ChatRoom = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [value, setValue] = useState("");
  return (
    <div className="flex">
      <ChatList
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
      />
      <ChatBox value={value} setValue={setValue} />
    </div>
  );
};

export default ChatRoom;
