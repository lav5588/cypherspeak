import { Server } from "socket.io";
import { verifyTokenForSocket } from "../middleware/socketMiddleware.js";
import { messageHandler, userConnectionHandler } from "../controllers/socket.controller.js";


let io;


export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL, // your frontend port
            credentials: true, // allow cookies to be sent from frontend
        },
    });

    io.use(verifyTokenForSocket); // Middleware to verify JWT token for socket connections

    io.on("connection", (socket) => {

        userConnectionHandler(socket); 
        console.log("🔌 New client connected:", socket.id);
        messageHandler(socket);
        
    });
    console.log("Socket.io initialized");
};

export const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    return io;
};
