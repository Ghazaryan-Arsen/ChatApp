import { useEffect, useRef, useState } from "react";
import Message from "../components/Message";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import SendMessage from "./SendMessage";
import { UserAuth } from "../context/AuthContext";

const ChatBox = () => {
  const messagesEndRef = useRef();
  const [messages, setMessages] = useState([]);
  const [imageList, setImageList] = useState([]);
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
        <Message
          key={message.id}
          imageList={imageList}
          setImageList={setImageList}
          message={message}
        />
      ))}
      {imageList.map((url) => {
        return <img key={currentUser.uid} className="w-80" src={url} />;
      })}

      {isTyping && (
        <div className="text-sm  text-gray-500 ml-2 ">
          typing<span className="loading loading-dots loading-xs"></span>
        </div>
      )}
      <SendMessage
        isTyping={isTyping}
        setIsTyping={setIsTyping}
        message={messages}
        imageList={imageList}
        setImageList={setImageList}
      />
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatBox;
