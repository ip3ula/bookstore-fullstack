import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Nav from './components/Nav';
import Home from './pages/Home';
import Loading from './components/loading'
import Search from './pages/Search';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Favorite from './pages/Favorite';
import About from './pages/About';
import Terms from './pages/Terms';
import DetailedBook from './pages/DetailedBook';
import Footer from './components/Footer';


function App() {
  const user = useSelector(state => state.user)
  return (
     <div>
      <Nav />
      <div className="pt-15">
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms/>} />
          <Route path="/favorite" element={user? <Favorite /> : <Navigate replace to="/login" />} />
          <Route path="books/:id" element={<DetailedBook />} />
        </Routes>
        </div>
        </div>
  );
}

export default App;
