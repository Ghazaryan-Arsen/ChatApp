import React, { useState } from "react";
import ChatBox from "../components/ChatBox";
import ChatList from "../components/ChatList";

const ChatRoom = ({ selectedUserId, setSelectedUserId }) => {
  const [value, setValue] = useState("");
  const selectedUserUid = null;
  let chatRoomName = "";
  return (
    <div className="flex">
      <ChatList
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        value={value}
        setValue={setValue}
        selectedUserUid={selectedUserUid}
        chatRoomName={chatRoomName}
      />

      <ChatBox
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        value={value}
        setValue={setValue}
        selectedUserUid={selectedUserUid}
        chatRoomName={chatRoomName}
      />
    </div>
  );
};

export default ChatRoom;
