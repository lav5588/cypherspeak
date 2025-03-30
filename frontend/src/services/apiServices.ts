import axios from "axios";


export const getAllUsers = async () => {
    try {
        const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`, {
            withCredentials: true,
        });
        return resp.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

export const getAllMessages = async () => {
    try {
        const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/messages`, {
            withCredentials: true,
        });
        console.log("resp", resp);
        return resp.data;
    } catch (error) {
        console.error("Error fetching messages:", error);
        throw error;
    }
}

export const readMessages = async (userId:String) => {
    try {
        const resp = await axios.post(`${import.meta.env.VITE_API_URL}/api/messages/read-messages/${userId}`,{}, {
            withCredentials: true,
        });
        return resp.data;
    } catch (error) {
        console.error("Error fetching messages:", error);
        throw error;
    }
}