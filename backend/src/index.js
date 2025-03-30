// index.js

import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });


import http from 'http';
import connectDB from './db/dbConnect.js';
import { initSocket } from './socket/socket.js';
import app from './app.js';

const PORT = process.env.PORT || 5000;

console.log("port: ", PORT);

// Create HTTP server from Express app
const server = http.createServer(app); // 👈 wrap express app in http server

// Connect DB and then start server
connectDB()
    .then(() => {
        // Initialize socket.io
        initSocket(server); // 👈 pass the HTTP server to socket init

        server.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Failed to connect to DB:', err.message);
        process.exit(1);
    });
