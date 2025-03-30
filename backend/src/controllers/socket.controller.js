import Message from "../models/message.model.js";
import { getIO } from "../socket/socket.js";
import User from "../models/user.model.js";

export const messageHandler = (socket) => {
    const io = getIO();
    socket.on("send-message", async (data) => {

        console.log("💬 Message received from client:", data);

        // save to db
        const message = await Message.create(data);
        if (!message) {
            console.error("Message not saved to DB");
            return;
        }
        const receiver = await User.findById(data.receiver);
        if (!receiver || !receiver.socketId) {
            console.error("Receiver not found");
        }

        io.to(receiver.socketId).emit("receive-message", message);
        io.to(socket.id).emit("receive-message", message);
    });
}

export const userConnectionHandler = async (socket) => {
    const io = getIO();
    const user = await User.findById(socket.user.id);
    if (!user) {
        console.error("User not found");
        return;
    }
    user.isOnline = true;
    user.socketId = socket.id;
    await user.save();
    io.emit("user-status", {
        userId: socket.user.id,
        isOnline: true,
    });

    socket.on("disconnect", () => {
        console.log("❌ Client disconnected:", socket.id);
        user.isOnline = false;
        user.socketId = null;
        user.save();
    });
}