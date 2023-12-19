import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChatRoom from "./pages/ChatRoom";
import Login from "./pages/Login";
import { PrivateRoute } from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { useState } from "react";
import ChatList from "./components/ChatList";
import UserNone from "./components/UserNone";
function App() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  // console.log(selectedUserId);
  return (
    <AuthProvider>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Login
              selectedUserId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
            />
          }
        />
        <Route
          path={`/chat`}
          element={
            <>
              <ChatList
                selectedUserId={selectedUserId}
                setSelectedUserId={setSelectedUserId}
              />
              <UserNone />
            </>
          }
        />
        <Route
          path={`/${selectedUserId}`}
          element={
            <PrivateRoute>
              <ChatRoom
                selectedUserId={selectedUserId}
                setSelectedUserId={setSelectedUserId}
              />
            </PrivateRoute>
          }
        />
      </Routes>
      {/* <ChatRoom /> */}
      {/* <Login/> */}
    </AuthProvider>
  );
}

export default App;
