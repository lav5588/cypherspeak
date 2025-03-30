import { Button } from "@/components/ui/button";
import socket from "@/socket/socket";
import { useEffect, useState } from "react";


const Home = () => {
    const [connected,setConnected] = useState(false);

    const sendMessage = (e:any) => {
        e.preventDefault();
        try {
            socket.emit("send-message", {
                content: "Hello from client 👋",
                sender: "vicky705", // example sender
                timestamp: new Date(),
            });
            console.log("📤 Message sent");
        } catch (error) {
            console.error("❌ Error sending message:", error);
        }
    }

    return <div className="flex flex-col items-center w-[100vw] justify-center min-h-[70vh]">
        <h1 className="text-5xl">Welcome to CypherSpeak 🔊</h1>
    </div>;
};

export default Home;
