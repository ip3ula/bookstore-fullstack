import axios from "axios";
const baseurl = `${import.meta.env.VITE_API_URL}/api/users`

export const getUser = async (config) => {
    const req = await axios.get(baseurl, config)
    console.log('req.data', req.data)
    console.log('config', config)
    return req.data
}

export const addFav = async (id, config) => {
    const req = await axios.post(`${baseurl}/favorites/${id}`, {}, config)
    return req.data
}

export const removeFav = async (id, config) => {
    const req = await axios.delete(`${baseurl}/favorites/${id}`, config)
    return req.data
}