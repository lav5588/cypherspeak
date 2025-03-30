// controllers/user.controller.js

import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const registerUser = async (req, res) => {
    try {
        const { name, email, password, avatar } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const newUser = await User.create({
            name,
            email,
            password, // Will be hashed by pre-save hook
            avatar,
        });

        // Create JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            avatar: newUser.avatar,
            token,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        // Set cookie
        res
            .cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            })
            .status(200)
            .json({
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                message: 'Login successful',
            });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// controllers/authController.js

export const logoutUser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
};


export const getUserSelf = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};



export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Don't send password
        console.log("getAllUsers called");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
