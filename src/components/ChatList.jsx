import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ChatList = ({
  selectedUserId,
  selectedUserUid,
  setSelectedUserId,
  value,
  setValue,
}) => {
  const [users, setUsers] = useState([]);
  const { currentUser } = UserAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map((doc) => doc.data());
      let updatedUsers = usersData.filter(
        (user) => user.uid !== currentUser.uid
      );
      setUsers(updatedUsers);
    };

    fetchUsers();
  }, []);

  const createChatRoom = async (selectedUser) => {
    const currentUid = currentUser.uid;
    selectedUserUid = selectedUser.uid;

    // Choose a consistent order for creating the chat room name
    const chatRoomName =
      currentUid < selectedUserUid
        ? `${currentUid}-${selectedUserUid}`
        : `${selectedUserUid}-${currentUid}`;

    setSelectedUserId(chatRoomName);

    const chatRoomRef = doc(db, chatRoomName, "messages");
    const chatRoomSnapshot = await getDoc(chatRoomRef);
    if (!chatRoomSnapshot.exists()) {
      // If the chat room doesn't exist, create it
      await setDoc(chatRoomRef, {
        users: [currentUid, selectedUserUid],
        createdAt: serverTimestamp(),
      });
    }

    navigate(`/${chatRoomName}`);
  };
  const navigate = useNavigate();
  return (
    <div className="container fixed mt-32 flex flex-col items-center justify-center w-72 mx-auto">
      <ul className="flex flex-col">
        {users.map((user) => (
          <li
            key={user.uid}
            onClick={() => createChatRoom(user)}
            className="flex flex-row mb-2 border-gray-400 cursor-pointer"
          >
            <div className="transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
              <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                <a href="#" className="relative block">
                  <img
                    alt="profil"
                    src={user.avatar} // Adjust this to your user data structure
                    className="mx-auto object-cover rounded-full h-10 w-10"
                  />
                </a>
              </div>
              <div className="flex-1 pl-1 md:mr-16">
                <div className="font-medium dark:text-white">
                  {user.displayName}
                </div>
              </div>
              {/* ... other code */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
