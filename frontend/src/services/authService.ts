import axios from 'axios';

export const registerUser = async (formData: any) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, formData, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        console.log('Registration response:', response.data);

        return response.data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
}

export const loginUser = async (formData: any) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, formData, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        console.log('Login response:', response.data);

        return response.data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
}

export const getUserSelf = async () => {
    const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/self`, {
        withCredentials: true,
    });
    console.log('User self response:', resp.data);
    return resp.data;
};

export const logoutUser = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/logout`, {
            withCredentials: true
        });
        console.log('Logout response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error during logout:', error);
        throw error;
    }
}