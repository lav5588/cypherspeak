import  { useEffect } from "react";
import { getAllMessages, } from "@/services/apiServices";
import { Card, CardContent} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Chat, setChats } from "@/redux-toolkit/slices/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

type User = {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
};

const UserChats = () => {
    // const [messages, setMessages] = useState<User[]>([]);
    const messages:Chat[] = useSelector((state: any) => state.chat.chats);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchChats = async () => {
        try {
            const data = await getAllMessages();
            // setMessages(data);
            dispatch(setChats(data));
            console.log("data", data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        if (messages.length === 0) {
            fetchChats();
        }
    }, []);

    const handleUserClick = (user: User) => {
        console.log("Selected User:", user);
        navigate(user._id);
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Chats</h2>
            <Button onClick={() => { fetchChats(); toast("Chats refreshed") }}>Refresh</Button>
            <div className="space-y-3">
                {messages.map((message) => (
                    <Card
                        key={message.user._id}
                        className="cursor-pointer hover:shadow-md transition"
                        onClick={() => handleUserClick(message.user)}
                    >
                        <CardContent className="flex items-center gap-4 py-4">
                            <div className="relative">
                                <Avatar>
                                    <AvatarImage
                                        src={message.user.avatar || `https://ui-avatars.com/api/?name=${message.user.name}`}
                                        alt={message.user.name}
                                    />
                                    <AvatarFallback>{message.user.name[0]}</AvatarFallback>
                                </Avatar>
                                <span
                                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${message.user.isOnline ? "bg-green-500" : "bg-gray-400"
                                        }`}
                                ></span>
                            </div>
                            <div>
                                <p className="font-semibold">{message.user.name}</p>
                                <p className="text-sm text-gray-500">{message.user.email}</p>
                            </div>
                            {message.unreadCount > 0 && (
                                <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    {message.unreadCount}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default UserChats;
