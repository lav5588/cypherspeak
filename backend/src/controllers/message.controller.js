import mongoose from "mongoose";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUserChats = async (req, res) => {
    try {
        const userId =req.user.id;
        // Fetch all messages where user is sender or receiver
        const messages = await Message.find({
            $or: [{ sender: userId }, { receiver: userId }],
        })
        .sort({ createdAt: 1 });

        console.log("Messages fetched:", messages);
        // Group messages by "chat partner" (the other user)
        const groupedChats = {};
        for (const msg of messages) {
            const isSender = msg.sender.toString() === userId.toString();
            const partnerId = isSender ? msg.receiver.toString() : msg.sender.toString();
        
            if (!groupedChats[partnerId]) {
                const partner = await User.findById(partnerId).select("name email avatar isOnline");
        
                groupedChats[partnerId] = {
                    user: partner,
                    messages: [],
                    unreadCount: 0,
                };
            }
        
            groupedChats[partnerId].messages.push(msg);
        
            if (!isSender && !msg.isRead) {
                groupedChats[partnerId].unreadCount++;
            }
        }

        // Fetch all users except the logged-in user
        const allUsers = await User.find({ _id: { $ne: userId } }).select("name email avatar isOnline");

        // Find users who are NOT in the chat list
        const chatUserIds = Object.keys(groupedChats);
        const newUsers = allUsers.filter((user) => !chatUserIds.includes(user._id.toString()));

        // Add new users at the end with an empty messages array
        newUsers.forEach((user) => {
            groupedChats[user._id.toString()] = {
                user,
                messages: [], // Empty messages array
                unreadCount: 0, // No unread messages
            };
        });

        res.status(200).json(
            Object.values(groupedChats), // Convert to array
        );

    } catch (error) {
        console.error("Error fetching user chats:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


export const readMessages = async (req, res) => {
    try {
        const { chatPartnerId } = req.params;
        const userId = req.user.id;

        // Update messages to mark them as read
        const updatedMessages = await Message.updateMany(
            {
                sender: chatPartnerId,
                receiver: userId,
                isRead: false,
            },
            { $set: { isRead: true } },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Messages marked as read",
            data: updatedMessages,
        });
    } catch (error) {
        console.error("Error marking messages as read:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}
