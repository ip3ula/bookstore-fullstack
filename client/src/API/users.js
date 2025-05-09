import axios from "axios";
const baseurl = `${import.meta.env.VITE_API_URL}/api/users`

const getUser = async (config) => {
    const req = await axios.get(baseurl, config)
    console.log('filtered', req.data)
    return req.data
}

const BeAMerchant = async (config) => {
    const obj = { merchant: true }
    const req = await axios.put(baseurl, obj, config)
    return req.data
}

const addFav = async (id, config) => {
    const req = await axios.post(`${baseurl}/favorites/${id}`, {}, config)
    return req.data
}

const removeFav = async (id, config) => {
    const req = await axios.delete(`${baseurl}/favorites/${id}`, config)
    return req.data
}


export default { getUser, addFav, removeFav, BeAMerchant }