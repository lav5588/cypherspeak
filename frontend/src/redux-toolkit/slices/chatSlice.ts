import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Message {
    _id: string;
    content: string;
    sender: string;
    createdAt: Date;
}

export interface Chat {
    user: {
        _id: string;
        name: string;
        email: string;
        avatar: string;
        isOnline: boolean;
    };
    messages: Message[];
    unreadCount: number;
}

interface ChatState {
    chats: Chat[];
    selectedChatUserId: string | null;
}

const initialState: ChatState = {
    chats: [],
    selectedChatUserId: null,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChats: (state, action: PayloadAction<Chat[]>) => {
            state.chats = action.payload;
        },
        selectChat: (state, action: PayloadAction<string | null>) => {
            state.selectedChatUserId = action.payload;
        },
        addMessageToChat: (
            state,
            action: PayloadAction<{ userId: string; message: Message }>
        ) => {
            const chat = state.chats.find(c => c.user._id === action.payload.userId);
            if (chat) {
                chat.messages.push(action.payload.message);
                chat.unreadCount += 1;
            }
        },
        setMessagesForChat: (
            state,
            action: PayloadAction<{ userId: string; messages: Message[] }>
        ) => {
            const chat = state.chats.find(c => c.user._id === action.payload.userId);
            if (chat) {
                chat.messages = action.payload.messages;
            }
        },
        clearMessagesForChat: (state, action: PayloadAction<string>) => {
            const chat = state.chats.find(c => c.user._id === action.payload);
            if (chat) {
                chat.messages = [];
            }
        },
        deleteMessageFromChat: (
            state,
            action: PayloadAction<{ userId: string; messageId: string }>
        ) => {
            const chat = state.chats.find(c => c.user._id === action.payload.userId);
            if (chat) {
                chat.messages = chat.messages.filter(
                    msg => msg._id !== action.payload.messageId
                );
            }
        },
    },
});

export const {
    setChats,
    selectChat,
    addMessageToChat,
    setMessagesForChat,
    clearMessagesForChat,
    deleteMessageFromChat,
} = chatSlice.actions;

export default chatSlice.reducer;
