import { Routes, Route } from 'react-router-dom';

import Nav from './components/Nav';
import Home from './pages/Home';
import Loading from './components/loading'
// import Search from './pages/Search';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Favorite from './pages/Favorite';
// import About from './pages/About'
// import Contact from './pages/Contact'
import DetailedBook from './pages/DetailedBook';


function App() {
  // setTimeout(() => {
  //   return <Loading />
  // }, 3000);
  return (
     <div>
      <Nav />
      <div className="pt-15">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/search" element={<Search />} /> */}
          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
          <Route path="books/:id" element={<DetailedBook />} />
        </Routes>
        </div>
        </div>
  );
}

export default App;
