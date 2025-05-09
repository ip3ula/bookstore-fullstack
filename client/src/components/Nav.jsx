import { useReducer, useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const NavLinks = ({ navDispatch }) => {
  const location = useLocation();

  const handleLinkClick = () => {
    navDispatch({ type: "HIDE" });  // Hide the menu when any link is clicked
  };
  const userData = true

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-10 text-3xl font-mono font-semibold pl-5 *:hover:text-hotpink sm:gap-5 *md:text-md *:sm:text-sm *:lg:text-lg z-60 sm:font-sans">
      <Link to="/" className={`${location.pathname === '/' ? 'text-hotpink' : ''}`} onClick={handleLinkClick}>Home</Link>
      <Link to="/favorite" className={`${location.pathname === '/favorite' ? 'text-hotpink' : ''}`} onClick={handleLinkClick}>Favorites</Link>
      <Link to="/orders" className={`${location.pathname === '/orders' ? 'text-hotpink' : ''}`} onClick={handleLinkClick}>My Orders</Link>
      <Link to="/about" className={`sm:hidden ${location.pathname === '/about' ? 'text-hotpink' : ''}`} onClick={handleLinkClick}>About</Link>
      <Link to="/contact" className={`sm:hidden ${location.pathname === '/contact' ? 'text-hotpink' : ''}`} onClick={handleLinkClick}>Contact</Link>
      {userData.merchant && <Link to="/merchant/books" className={`${location.pathname === '/merchant/books' ? 'text-hotpink' : ''}`} onClick={handleLinkClick}>Manage books</Link>}
      {!userData.merchant && <Link to="/merchant/be" className={`${location.pathname === '/merchant/be' ? 'text-hotpink' : ''}`} onClick={handleLinkClick}>Be a merchant</Link>}
    </div>
  );
};

const UserMenu = ({ user, dispatch }) => {
  return (
    <div className="fixed w-full h-50 bg-spearmint z-30 shadow-md mt-15 p-5 flex flex-col items-center justify-start gap-2">
      <div className="bg-hotpink text-white text-4xl border-2 border-rosewater size-20 rounded-full flex items-center justify-center mx-auto">
        {user.name.trim()[0]}
      </div>
      <p className="text-center border-b border-rosewater pb-2 font-bold text-2xl">{user.name}</p>
      <button className="hover:cursor-pointer font-semibold" onClick={() => dispatch({ type: 'RESET' })}>
        Log out
      </button>
    </div>
  );
};

const Nav = () => {
  const user = true
  const [userData, setUserData] = useState(false);
  const navigate = useNavigate();
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navReducer = (state, action) => {
    switch (action.type) {
      case "SHOW":
      case "SEARCH":
        return true;
      case "HIDE":
        return false;
      default:
        return state;
    }
  };

  const [nav, navDispatch] = useReducer(navReducer, false);

  return (
    <div>
      <div className={`h-15 flex items-center justify-between px-4 fixed w-full bg-spearmint z-40 sm:px-10 border-b border-rosewater sm:border-0 ${scroll ? "sm:border-b-1" : ""}`}>
        <div className="flex gap-2 items-center">
          {!nav && (
            <svg
              onClick={() => navDispatch({ type: "SHOW" })}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 sm:hidden hover:cursor-pointer"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
            </svg>
          )}
          <p className="text-xl sm:text-2xl font-bold font-playwrite">FreePage</p>
        </div>

        <div className="hidden mx-auto sm:block *:font-bold">
          <NavLinks />
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <Link to="/search">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 hover:cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </Link>

          {!user && (
            <Link to="/login">
              <button className="bg-stone-900 text-white p-1.5 rounded-4xl w-22 font-serif hover:cursor-pointer">Log in</button>
            </Link>
          )}

          {user && (
            <div className="flex gap-2 sm:gap-5">
              <svg
                onClick={() => navigate("/cart")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7 hover:cursor-pointer"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>

              <svg
                onClick={() => setUserData(!userData)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7 hover:cursor-pointer"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {nav && (
        <div className="fixed inset-0 pt-50 px-5 sm:hidden bg-spearmint/95 backdrop-blur-sm z-60 flex flex-col items-start justify-center gap-5 pb-20 overflow-y-auto overflow-x-hidden">

          <div className="flex justify-end mb-4 z-50">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-15 ml-5 text-hotpink">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
</svg>
            <svg
              onClick={() => navDispatch({ type: "HIDE" })} 
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7 hover:cursor-pointer absolute top-5 left-5 opacity-20 z-60"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            <svg className="size-[600px] absolute text-hotpink bottom-1/4 -right-15  -rotate-70  mx-auto z-10 opacity-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1729 149"><path d="M1689.89 26.59a4479.17 4479.17 0 0 0-89.64-7.41C1354.1.45 1106.56-5.76 859.92 5.93c-227.31-4.25-454.79 8.96-681.36 27.95C121.94 38.9 65.1 40.2 8.38 42.12c-16.57 2.86-5.23 26.39 5.6 14.46 160.76-1.27 331.82-27.38 620.54-34.8A4574.9 4574.9 0 0 0 498.9 36.57C376.43 52.24 253.01 65.21 132.88 94.51c-36.16 8.94-71.67 20.31-106.69 32.95-7.14 4.4-27.74 3.63-24.98 15.62 1.99 7.19 13.63 7.05 18.04 2.59 143.67-54.58 297.49-70.64 448.88-90.24 129.01-16.82 258.61-28.01 388.46-34.27 285.02 6.07 570.13 38.15 848.22 100.65 3.84 1.09 8.24-1.32 9.23-5.24 1.98-7.31-5.66-9.96-11.42-10.6-48.05-10.76-96.18-21.26-144.56-30.43-160.68-28.2-322.86-46.78-485.4-60.19l-2.34-.16c161.55-1.33 323.21 4.35 484.31 15.71 37.11 2.65 125.06 8.85 164.97 13.96a7.58 7.58 0 0 0 8.45-6.41c.94-13.18-23.48-8.77-38.14-11.86Z" fill="currentColor   "></path></svg>
          </div>
          <NavLinks navDispatch={navDispatch} />
        </div>
      )}

      {userData && user && <UserMenu user={user} dispatch={dispatch} />}
    </div>
  );
};

export default Nav;
