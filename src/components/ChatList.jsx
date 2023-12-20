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
  group,
  setGroup,
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
      console.log(users);
      setUsers(updatedUsers);
    };

    fetchUsers();
  }, []);

  const createGroupChatRoom = async (selectedUsers) => {
    const currentUid = currentUser.uid;

    // Ensure there are selected users
    if (selectedUsers.length < 1) {
      alert("Select at least one user to create a chat group.");
      return;
    }

    // Sort UIDs for consistency in creating the chat room name
    const sortedUserUids = [...selectedUsers, currentUid].sort();

    // Create a unique chat room name based on sorted UIDs
    const chatRoomName = sortedUserUids.join("-");

    setSelectedUserId(chatRoomName);

    const chatRoomRef = doc(db, "Groups" + chatRoomName, "messages");
    const chatRoomSnapshot = await getDoc(chatRoomRef);

    if (!chatRoomSnapshot.exists()) {
      // If the chat room doesn't exist, create it
      await setDoc(chatRoomRef, {
        users: sortedUserUids,
        group: sortedUserUids,
        createdAt: serverTimestamp(),
      });
    }

    console.log(chatRoomName);
    navigate(`/${chatRoomName}`);
  };
  const createChatRoom = async (selectedUser) => {
    const currentUid = currentUser.uid;
    selectedUserUid = selectedUser.uid;

    // Choose a consistent order for creating the chat room name
    let chatRoomName =
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
    // setDoc(doc(db, "users", chatRoomName), {
    //   displayName: currentUser.displayName,
    //   email: currentUser.email,
    //   uid: currentUser.uid,
    //   avatar: currentUser.photoURL,
    // });
    navigate(`/${chatRoomName}`);
  };
  // const [groupUsers, setGroupUsers] = useState([]);

  // const updateGroupUsers = (newGroupUsers) => {
  //   setGroupUsers(newGroupUsers);
  // };

  // useEffect(() => {
  //   // Update groupUsers when the selected group changes
  //   const updatedGroupUsers = users.filter((user) => group.includes(user.uid));
  //   updateGroupUsers(updatedGroupUsers);
  // }, [group, users]);
  const navigate = useNavigate();
  useEffect(() => {
    setDoc(doc(db, "users", currentUser.uid), {
      displayName: currentUser.displayName,
      email: currentUser.email,
      uid: currentUser.uid,
      avatar: currentUser.photoURL,
    });
  }, [currentUser.uid]);
  return (
    <div className="container fixed mt-28 flex flex-col items-center justify-center w-72 mx-auto">
      <button
        className="btn w-72 mb-4"
        onClick={() => createGroupChatRoom(group)}
      >
        Create Group
      </button>
      <ul className="flex flex-col">
        {users.map((user) => (
          <>
            <li
              key={user.uid}
              className="flex flex-row items-center	 mb-3 border-gray-400 cursor-pointer"
            >
              <div
                className="transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4"
                onClick={() => createChatRoom(user)}
              >
                <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                  <a href="#" className="relative block">
                    <img
                      alt="profil"
                      src={user.avatar} // Adjust this to your user data structure
                      className="mx-auto object-cover rounded-full h-10 w-10"
                    />
                  </a>
                </div>
                <div className="flex-1 pl-1 md:mr-7">
                  <div className=" font-medium dark:text-white">
                    {user.displayName}
                  </div>
                </div>

                {/* ... other code */}
              </div>
              <button
                className="btn h-full text-white"
                onClick={() => {
                  if (group.includes(user.uid)) {
                    // If user is already in the "done" array, remove them
                    setGroup(group.filter((uid) => uid !== user.uid));
                  } else {
                    // If user is not in the "done" array, add them
                    setGroup([...group, user.uid]);
                  }
                }}
              >
                {group.includes(user.uid) ? <p>✔️</p> : <p>➕</p>}
              </button>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
