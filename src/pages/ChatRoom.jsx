import React, { useState } from "react";
import ChatBox from "../components/ChatBox";
import ChatList from "../components/ChatList";

const ChatRoom = ({ selectedUserId, setSelectedUserId, group, setGroup }) => {
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
        group={group}
        setGroup={setGroup}
      />

      <ChatBox
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        value={value}
        setValue={setValue}
        selectedUserUid={selectedUserUid}
        chatRoomName={chatRoomName}
        group={group} // Pass the group information to ChatBox
        setGroup={setGroup}
      />
    </div>
  );
};

export default ChatRoom;
