import { useEffect, useRef, useState } from "react";
import Message from "../components/Message";
import {
  collection,
  query,
  doc,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import SendMessage from "./SendMessage";
import { UserAuth } from "../context/AuthContext";

const ChatBox = ({value,setValue}) => {
  const messagesEndRef = useRef();
  const [messages, setMessages] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const { currentUser } = UserAuth();

  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
        setMessages(messages);
      });
    });
    return unsubscribe;
  }, []);

  return (
    <div className="pb-44  pt-20 containerWrap">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}

      {isTyping && (
        <div className="text-sm  text-gray-500 ml-2 ">
          typing<span className="loading loading-dots loading-xs"></span>
        </div>
      )}
      <SendMessage
        isTyping={isTyping}
        setIsTyping={setIsTyping}
        message={messages}
        value={value} setValue={setValue}
      />
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatBox;
