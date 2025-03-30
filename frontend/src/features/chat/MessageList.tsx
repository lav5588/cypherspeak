import  { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Chat, Message } from "@/redux-toolkit/slices/chatSlice";

const MessageList = () => {
    const params = useParams();
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const chats = useSelector((state: RootState) => {
        const ch = state.chat.chats.filter((chat:Chat) => chat.user._id === params.userId);
        return ch[0]?.messages || [];
    });

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "instant" });
        }
    }, [chats]); 

    return (
        <div className="space-y-3 p-4 max-h-[75vh] min-h-[75vh]">
            {chats.map((msg:Message) => (
                <Card
                    key={msg._id}
                    className={`p-3 rounded-lg max-w-xs ${
                        msg.sender == params.userId
                            ? " "
                            : "ml-auto"
                    }`}
                >
                    <div className="text-sm">{msg.content}</div>
                    <div className="text-xs mt-1 opacity-70 text-right">
                        {new Date(msg.createdAt).toLocaleTimeString()}
                    </div>
                    <div className="text-xs mt-1 opacity-70 text-right">
                        {new Date(msg.createdAt).toLocaleDateString()}
                    </div>
                </Card>
            ))}
            <div ref={bottomRef} />
        </div>
    );
};

export default MessageList;
