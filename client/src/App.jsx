import { useQuery } from '@tanstack/react-query';
import { Routes, Route } from 'react-router-dom';
import { getAll } from './services/books';
import userServices from './services/users';
import { useEffect, useReducer } from 'react';

import Home from './components/Home';
import Search from './components/Search';
import Login from './components/Login';
import Signup from './components/Signup';
import Favorite from './components/Favorite';
import About from './components/About'
import Contact from './components/Contact'
import Cart from './components/Cart'
import Publish from './components/Publish'
import MerchantBooks from './components/MerchantBooks'
import Orders from './components/Orders';
import BeAMerchant from './components/BeAMerchant';

import CategoryContext from './CategoryContext';
import UserContext from './UserContext';
import UserDataContext from './userDataContext';

function App() {
  const result = useQuery({
    queryKey: ['books'],
    queryFn: getAll,
  });

  const CategoryReducer = (state, action) => {
    switch (action.type) {
      case 'INIT': {
        const allBooks = action.payload;
        return {
          allBooks,
          filteredBooks: allBooks,
        };
      }
      case 'CATEGORY': {
        const category = action.payload;
        const filteredBooks = category === 'all'
          ? state.allBooks
          : state.allBooks.filter(book =>
              book.genres.some(
                genre => genre.toLowerCase().replace(/\s+/g, '') === category
              )
            );
        return {
          ...state,
          filteredBooks,
        };
      }
      default:
        return state;
    }
  };
  
  const [state, dispatch] = useReducer(CategoryReducer, {
    allBooks: [],
    filteredBooks: [],
  });

  const initialState = JSON.parse(localStorage.getItem('user')) || null

  const userReducer = (state, action) => {
    switch (action.type) {
      case 'SET':
        localStorage.setItem('user', JSON.stringify(action.payload));
        return action.payload;
      case 'RESET':
        localStorage.removeItem('user');
        return null;
      default:
        return state;
    }
  };

  const [user, userDispatch] = useReducer(
    userReducer,
    initialState
  );

  useEffect(() => {
    if (result.data) {
      dispatch({ type: 'INIT', payload: result.data });
    }
  }, [result.data]);

  const userResult = useQuery({
    queryKey: ['user', user?.token],
    enabled: !!user?.token, 
    queryFn: () => userServices.getUser({ headers: { Authorization: `Bearer ${user.token}` } }),
  });
  

  const userDataReducer = (state, action) => {
    switch (action.type) {
      case 'INIT':
        return action.payload
      default:
        return state;
    }
  };
  const [userData, userDataDispatch] = useReducer(userDataReducer, null);
  

  useEffect(() => {
    if (userResult.data) {
      userDataDispatch({ type: 'INIT', payload: userResult.data})
    }
  }, [userResult.data])
  
  if (result.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-20 animate-pulse text-hotpink"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
          />
        </svg>
      </div>
    );
  }

  if (result.isError) {
    return <div>Error loading data</div>;
  }

  return (
    <UserDataContext.Provider value={[userData, userDataDispatch]} >

    <UserContext.Provider value={[user, userDispatch]}>
      <CategoryContext.Provider value={[state.filteredBooks, dispatch, state.allBooks]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/merchant/publish" element={<Publish />} />
          <Route path="/merchant/books" element={<MerchantBooks />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/merchant/be" element={<BeAMerchant />} />
        </Routes>
      </CategoryContext.Provider>
    </UserContext.Provider>
    </UserDataContext.Provider>
  );
}

export default App;
