import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/books'

export const getAll = async () => {
    const res = await axios.get(baseUrl)
    console.log('books',res.data)
    return res.data
}