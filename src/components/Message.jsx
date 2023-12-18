import { UserAuth } from "../context/AuthContext";

const Message = ({ message, imageList, setImageList }) => {
  const { currentUser } = UserAuth();

  return (
    <div>
      <div
        className={`chat ${
          message.uid === currentUser.uid ? "chat-end" : "chat-start"
        }`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="" src={message.avatar} />
          </div>
        </div>
        <div className=" chat-header">
          {currentUser.uid === message.uid && `${currentUser.displayName}`}
          <time className="text-xs opacity-50">12:45</time>
        </div>
        {message.image && (
          <img
            key={message.id}
            className="w-56 "
            src={message.image}
            alt="Sent"
          />
        )}
        {message.text && (
          <div className="chat-bubble    max-w-sm break-words">
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};
export default Message;
