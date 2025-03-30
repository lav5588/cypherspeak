import  { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import socket from "@/socket/socket";
import { useParams } from "react-router-dom";
import { RootState } from "@/redux-toolkit/store";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const params = useParams();
    const senderId = useSelector((state:RootState) => state.auth?.user?._id) || null; // Adjust the selector based on your state structure

    const handleSend = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message.trim()) return;
        const msgData = {
            content: message,
            sender: senderId,
            receiver: params.userId,
        };
        console.log("Message data:", msgData);
        socket.emit("send-message", msgData);
        setMessage("");
    };

    return (
        <form onSubmit={handleSend} className="flex gap-2">
            <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit">Send</Button>
        </form>
    );
};

export default MessageInput;
