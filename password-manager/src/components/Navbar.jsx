import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
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
          <a href="https://github.com/MA1ya1nk/password-manager">
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
          <button
            className="text-white bg-green-700 my-5 mx-2 rounded-full flex  justify-between items-center ring-white ring-1"
            onClick={logout}
          >
            <span className="font-bold px-2"> 🔐 Sign Out</span>
          </button>
         )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
