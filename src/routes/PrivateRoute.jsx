import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
export const PrivateRoute = ({ children }) => {
  const { currentUser, signinWithGoogle } = UserAuth();

  if (!currentUser) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};
