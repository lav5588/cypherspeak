

import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        console.log('Mongo URI:', mongoURI); // Log the Mongo URI for debugging
        if (!mongoURI) {
            throw new Error('MONGO_URI is missing in environment variables');
        }

        await mongoose.connect(`${mongoURI}/cypherspeak`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        throw error;
    }
};

export default connectDB;
