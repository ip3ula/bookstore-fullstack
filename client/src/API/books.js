import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_API_URL}/api/books`;

export const getBooks = async (category = 'all', subcategory) => {
  const url = category === 'all' ? `${baseUrl}/?subcategory=${subcategory}` : `${baseUrl}?category=${category}&subcategory=${subcategory}`;
  const res = await axios.get(url);
  return res.data;
};

export const getBook = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

export const searchBooks = async (query) => {
  const res = await axios.get(`${baseUrl}/?limit=7&search=${query}`);
  console.log('query',query)
  return res.data;
}