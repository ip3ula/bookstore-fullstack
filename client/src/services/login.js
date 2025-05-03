import axios from 'axios';
const baseUrl = `${import.meta.env.VITE_API_URL}/api/login`;

export const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
}