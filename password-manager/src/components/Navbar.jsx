import React, {useEffect} from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const { logout, user } = useContext(AuthContext);
  
  
  return (
    <nav className="bg-slate-800 text-white ">
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <Link to="/">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-500"> &lt;</span>

          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </div>
        </Link>
        <div className="flex ">
          <a href="https://github.com/MA1ya1nk/pass_backend">
            <button className="text-white bg-green-700 my-5 mx-2 rounded-full flex  justify-between items-center ring-white ring-1">
              <img
                className="invert  w-10 p-1"
                src="/icons/github.svg"
                alt="github logo"
              />
              <span className="font-bold px-2">GitHub</span>
            </button>
          </a>

          {/* signin */}
          {!user && (
          <Link to="/signin">
            <button className="text-white bg-green-700 my-5 mx-2 rounded-full flex justify-between items-center ring-white ring-1">
              <span className="font-bold px-2 py-2">🔐 Sign In</span>
            </button>
          </Link>
          )}

          {/* Logout here */}
         {user && (
          // <button
          //   className="text-white bg-green-700 my-5 mx-2 rounded-full flex  justify-between items-center ring-white ring-1"
          //   onClick={logout}
          // >
          //   <span className="font-bold px-2"> 🔐 Sign Out</span>
          // </button>



            
  <div className="relative">
    <button
      onClick={() => setShowDropdown(!showDropdown)}
      // onBlur={() =>
      //   setTimeout(() => {
      //     setShowDropdown(false);
      //   }, 50)
      // }
      className="text-white bg-green-700 my-5 mx-2 rounded-full flex justify-between items-center ring-white ring-1 hover:bg-green-800 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium px-2 py-2"
      type="button"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200 flex items-center justify-center flex-shrink-0">
          {user.profilePicture ? (
            <img 
              src={user.profilePicture} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <svg 
              className="w-5 h-5 text-gray-500" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          )}
          </div>
      <span className="font-bold">Welcome {user.username}</span>
      </div>
      <svg
        className="w-2.5 h-2.5 ms-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </button>

    <div
      onMouseDown={(e) => e.preventDefault()}
      className={`absolute top-16 right-0 z-10 ${
        showDropdown ? "" : "hidden"
      } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
    >
      <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
        <div className="font-medium truncate">
          {user.email}
        </div>
      </div>
      <ul
        className="py-2 text-sm text-gray-700 dark:text-gray-200"
      >
        <li>
          <Link
            to="/dashboard"
            onClick={() => setShowDropdown(false)}
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/manager"
            onClick={() => setShowDropdown(false)}
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Your Passwords
          </Link>
        </li>
        
      </ul>
      <div className="py-2">
        <Link
          onClick={() => {
            setShowDropdown(false);
            logout();
          }}
          to="/"
          //onClick={() => setShowDropdown(false)}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
        >
          Sign out
        </Link>
      </div>
    </div>
  </div>

         )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
