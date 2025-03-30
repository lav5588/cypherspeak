

// routes/user.routes.js

import express from 'express';
import {
    registerUser,
    loginUser,
    getAllUsers,
    getUserSelf,
    logoutUser,
} from '../controllers/user.controllers.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout',logoutUser);
router.get('/self', verifyToken, getUserSelf);
router.get('/',verifyToken, getAllUsers); 

export default router;
