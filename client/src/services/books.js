import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_API_URL}/api/books` 

export const getAll = async () => {
    const res = await axios.get(baseUrl)
    console.log('books',res.data)
    return res.data
}
