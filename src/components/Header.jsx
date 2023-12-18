import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-[1200px] mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Dung</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-700" />
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-600 hover:underline cursor-pointer">Home</li>
          </Link>
          <Link to="/about">
            <li className=" text-slate-600 hover:underline cursor-pointer">About</li>
          </Link>
          <Link to="/sign-in">
            <li className=" text-slate-600 hover:underline cursor-pointer">Sign In</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;