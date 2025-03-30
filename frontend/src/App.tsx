
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import Home from "./features/Home"
import Register from "./features/auth/Register"
import Login from "./features/auth/Login"
import NoPage from "./features/NoPage"
import { useEffect } from "react"
import socket from "./socket/socket"
import { useDispatch, useSelector } from "react-redux"
import UserChats from "./features/chat/UserChats"
import { Toaster } from "./components/ui/sonner"
import ChatWindow from "./features/chat/ChatWindow"
import { addMessageToChat } from "./redux-toolkit/slices/chatSlice"
import { RootState } from "./redux-toolkit/store"



const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state:RootState) => state.auth.user);
  useEffect(() => {
    if (!user && socket.connected) {
      socket.disconnect();
      return;
    }
    if (user && !socket.connected) {
      socket.connect();
    }
    socket.on("connect", () => {
      console.log("🟢 Connected to server", socket.id);
    });
    socket.on("receive-message", (data) => {
      console.log("📩 Message received:", data);
      if (user && user._id === data.sender) {
        dispatch(addMessageToChat({ userId: data.receiver, message: data }));
      }
      else if (user && user._id === data.receiver) {
        dispatch(addMessageToChat({ userId: data.sender, message: data }));
      }
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Connection error:", err.message);
    });

    return () => {
      socket.off("receive-message"); // Clean up on unmount
    };
  }, [user, dispatch]);

  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="chats" element={<UserChats />} />
          <Route path="chats/:userId" element={<ChatWindow />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
