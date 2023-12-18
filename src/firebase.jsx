import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAi8zFjSqGaq52CKxqWL5cz4Gf3VumziSU",
  authDomain: "instantchat-a396e.firebaseapp.com",
  projectId: "instantchat-a396e",
  storageBucket: "instantchat-a396e.appspot.com",
  messagingSenderId: "623830165975",
  appId: "1:623830165975:web:13b4b3fb8b44e8752f4392",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
