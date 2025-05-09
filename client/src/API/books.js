import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_API_URL}/api/books`;

export const getBooks = async (category = 'all', subcategory) => {
  console.log('category', category)
  console.log('subCategory', subcategory)
  const url = category === 'all' ? `${baseUrl}/?subcategory=${subcategory}` : `${baseUrl}?category=${category}&subcategory=${subcategory}`;
  console.log('url', url)
  const res = await axios.get(url);
  console.log('data', res.data)
  return res.data;
};

export const getBook = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};
