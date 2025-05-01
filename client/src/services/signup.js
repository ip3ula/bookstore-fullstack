import axios from "axios";
const baseUrl = 'http://localhost:3001/api/users'

export const addUser = async (info) => {
    const res = await axios.post(baseUrl, info)
    return res.data
}