import { useReducer, useContext, useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../UserContext";
import UserDataContext from "../userDataContext";
import { useNavigate } from "react-router-dom";

const NavLinks = () => {
  const [userData] = useContext(UserDataContext)
  if (!userData) return null
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-lg pl-5 *:hover:text-hotpink sm:gap-5 *md:text-md *:sm:text-sm *:lg:text-lg">
      <Link to="/favorite">Favorites</Link>
      {userData.merchant && <>
      <Link to="/merchant/books">Manage books</Link>
        </>}
        {userData.merchant || <Link to="/merchant/be">Be a merchant</Link>}
      <Link to="/orders">orders</Link>

    </div>
  );
};

const UserMenu = ({ user, dispatch }) => {
    
  return <div className="fixed w-full h-50 bg-spearmint z-15 shadow-md mt-15 p-5 flex flex-col items-center justify-start gap-2">
  <div className="bg-hotpink text-white text-4xl border-2 border-rosewater size-20 rounded-full flex items-center justify-center mx-auto">{user.name.trim()[0]}</div>
  <p className="text-center border-b border-rosewater pb-2 font-bold text-2xl">{user.name}</p>
  <button className="hover:cursor-pointer font-semibold" onClick={() => dispatch({type: 'RESET'})}>Log out</button>
  </div>;
};

const Nav = () => {
  const [user, dispatch] = useContext(UserContext);
  const [userData, setUserData] = useState(false);
  const navigate = useNavigate();
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  })
  const navReducer = (state, action) => {
    switch (action.type) {
      case "SHOW":
        return true;
      case "HIDE":
        return false;
      case "SEARCH":
        return true;
      default:
        return state;
    }
  };

  const [nav, navDispatch] = useReducer(navReducer, false);

  return (
    <div>
      <div className={`h-15 flex items-center justify-between px-2 fixed w-full  bg-spearmint z-15 sm:px-10 border-b border-rosewater sm:border-0 ${scroll ? "sm:shadow-md" : ""}`}>
        <div className="flex gap-2 items-center">
          {!nav ? (
            <svg
              onClick={() => navDispatch({ type: "SHOW" })}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 sm:hidden hover:cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            </svg>
          ) : (
            <svg
              onClick={() => navDispatch({ type: "HIDE" })}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 sm:hidden hover:cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          )}
          <p className="text-xl sm:text-2xl font-bold font-playwrite">bookStore</p>
        </div>
        <div className="hidden mx-auto sm:block">
          <NavLinks />
        </div>
        <div className="flex items-center gap-3 sm:gap-5">
          <Link to="/search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7 hover:cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </Link>
          {!user && (
            <Link to="/login">
              <button className="bg-stone-900 text-white p-1.5 rounded-4xl w-22 font-serif hover:cursor-pointer">
                Log in
              </button>
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      {nav && (
        <div className="fixed top-15 p-5 shadow-2xl transform bg-spearmint w-full z-16 sm:hidden">
          <NavLinks user={user}/>
        </div>
      )}
      {userData && user && <UserMenu user={user} dispatch={dispatch} />}
    </div>
  );
};

export default Nav;
