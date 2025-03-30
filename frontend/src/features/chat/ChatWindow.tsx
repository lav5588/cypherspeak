
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllMessages, readMessages } from "@/services/apiServices";
import { Chat, selectChat, setChats } from "@/redux-toolkit/slices/chatSlice";
import { useParams } from "react-router-dom";
import { RootState } from "@/redux-toolkit/store";

const ChatWindow = () => {
    const chats = useSelector((state:RootState) => state.chat);
    const[name,setName] = useState("");
    const dispatch = useDispatch();
    const params = useParams();
    const fetchChats = async () => {
            try {
                const data = await getAllMessages();
                dispatch(setChats(data));
                console.log("data", data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
    };
    useEffect(() => {
        console.log("Chats in ChatWindow:", chats);

        if(params.userId !== undefined) {
            dispatch(selectChat(params.userId));
        }
        if(chats.chats.length === 0) {
            fetchChats();
        }
        if(chats.chats.length !== 0) {
            chats.chats.forEach((chat:Chat)=>{
                if( chat.user._id === params.userId) {
                    setName(chat.user.name)
                }
            })
        }
        return () => {
            dispatch(selectChat(null));
            if(params.userId != undefined) {
                readMessages(params.userId).then(()=>{
                    fetchChats();
                })
            }
        };
    }, []);
    return (
        <div className="flex flex-col h-full max-h-[90vh] w-full border rounded-xl shadow-md overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b bg-muted text-center font-semibold text-lg">
                {name}
            </div>

            {/* Message List */}
            <div className="flex-1 overflow-y-auto p-4">
                <MessageList />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
                <MessageInput />
            </div>
        </div>
    );
};

export default ChatWindow;
