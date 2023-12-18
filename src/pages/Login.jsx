import React, { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
// import firebase from "../firebase"
import { doc, setDoc } from "firebase/firestore";

import { db } from "../firebase";
import { getAuth } from "firebase/auth";
const Login = () => {
  const navigate = useNavigate();
  const { currentUser, signinWithGoogle } = UserAuth();
  const handleLogin = async () => {
    try {
      await signinWithGoogle();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/chat");
    }
  }, [currentUser]);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there 👋</h1>
          <p className="py-6">Provident cupiditate voluptatem et in.</p>
          <button
            onClick={() => {
              handleLogin();
            }}
            className="btn  bg-slate-500 text-slate-100"
          >
            Login with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
