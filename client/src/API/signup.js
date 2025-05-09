import axios from "axios";
const baseUrl = `${import.meta.env.VITE_API_URL}/api/users`

export const addUser = async (info) => {
    const res = await axios.post(baseUrl, info)
    return res.data
}