import { useState, useEffect } from "react";
import { FaRegImage } from "react-icons/fa";

import { UserAuth } from "../context/AuthContext";
import {
  addDoc,
  doc,
  setDoc,
  onSnapshot,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import InputEmoji from "react-input-emoji";

const SendMessage = ({ setIsTyping, value, setValue,selectedUserId ,setSelectedUserId }) => {
  const [imageUpload, setImageUpload] = useState(null);
  const { currentUser, displayName } = UserAuth();

  useEffect(() => {
    const typingRef = doc(db, "typing", currentUser.uid);

    const handleTyping = async () => {
      try {
        await setDoc(typingRef, {
          user: currentUser.uid,
          isTyping: true,
        });

        setTimeout(async () => {
          await setDoc(typingRef, {
            user: currentUser.uid,
            isTyping: false,
          });
        }, 7000);
      } catch (error) {
        console.error("Error updating typing status:", error);
      }
    };

    handleTyping();

    return () => {
      setDoc(typingRef, {
        user: currentUser.uid,
        isTyping: false,
      });
    };
  }, [value, currentUser.uid]);

  useEffect(() => {
    const typingCollection = collection(db, "typing");
    const unsubscribe = onSnapshot(typingCollection, (snapshot) => {
      const typingUsers = snapshot.docs
        .filter((doc) => doc.id !== currentUser.uid && doc.data().isTyping)
        .map((doc) => doc.id);

      setIsTyping(typingUsers.length > 0);
    });
    setDoc(doc(db, "users", currentUser.uid), {
      displayName: currentUser.displayName,
      email: currentUser.email,
      uid: currentUser.uid,
      avatar: currentUser.photoURL,
    });
    return () => unsubscribe();
  }, [currentUser.uid]);
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (value.trim() === "" && !imageUpload) {
      alert("Input Empty");
      return;
    }

    try {
      const { uid, displayName, photoURL } = currentUser;
      if (imageUpload) {
        const imageRef = ref(storage, `images/${v4()}_${imageUpload.name}`);
        await uploadBytes(imageRef, imageUpload);
        const imageUrl = await getDownloadURL(imageRef);

        await addDoc(collection(db, "messages"), {
          text: value,
          image: imageUrl,
          name: displayName,
          avatar: photoURL,
          createdAt: serverTimestamp(),
          uid,
        });

        setImageUpload(null);
        setValue("");
      } else {
        await addDoc(collection(db, "messages"), {
          text: value,
          name: displayName,
          avatar: photoURL,
          createdAt: serverTimestamp(),
          uid,
        });

        setValue("");
        setImageUpload(null);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="bg-gray-400 w-full   fixed  bottom-0   py-3  shadow-lg">
      <form onSubmit={handleSendMessage} className="px-3 mx containerWrap flex">
        <InputEmoji
          value={value}
          onChange={setValue}
          // cleanOnEnter
          // onEnter={handleSendMessage}
          // height={80}
          borderRadius={"6px"}
          placeholder=""
        />

        <label htmlFor="files" className="btn">
          <FaRegImage className="  text-xl		" />
        </label>

        <input
          id="files"
          className="text-white invisible disabled hidden"
          type="file"
          onChange={(e) => setImageUpload(e.target.files[0])}
        />

        <button
          type="submit"
          onClick={handleSendMessage}
          className="w-auto bg-gray-500 text-white rounded-r-lg  px-5 text-sm"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
