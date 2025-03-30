

// routes/user.routes.js

import express from 'express';

import { verifyToken } from '../middleware/auth.middleware.js';
import { getUserChats, readMessages } from '../controllers/message.controller.js';

const router = express.Router();


router.get('/', verifyToken,getUserChats); // Get all chats for the logged-in user
router.post('/read-messages/:chatPartnerId', verifyToken,readMessages);
export default router;
