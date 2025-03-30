import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import User from './models/user.model.js';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

// Middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true 
}));
console.log("CORS enabled for:", process.env.FRONTEND_URL);
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data
app.use(cookieParser());

app.get('/', async(req, res) => {
    const user = await User.findOne({email:"test@test.com"})
    user.password = "test123"
    await user.save()
    return res.status(200).json({ message: 'Welcome to the CypherSpeak!' });
})

import userRouter from './routes/user.routes.js';
import messageRouter from './routes/message.routes.js';

app.use('/api/users', userRouter);
app.use('/api/messages', messageRouter);

export default app;