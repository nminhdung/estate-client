import React, { useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <div className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-[1200px] mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Dung</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <button type='submit'>
            <FaSearch className="text-slate-700" />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-600 hover:underline cursor-pointer">Home</li>
          </Link>
          <Link to="/about">
            <li className=" text-slate-600 hover:underline cursor-pointer">About</li>
          </Link>

          {currentUser ?
            (<Link to='/profile'>
              <img src={currentUser.avatar} className="w-7 h-7 object-cover rounded-full" alt="avatar" />
            </Link>) :
            (<Link to="/sign-in">
              <li className=" text-slate-600 hover:underline cursor-pointer">Sign In</li>
            </Link>)
          }

        </ul>
      </div>
    </div>
  );
};

export default Header;