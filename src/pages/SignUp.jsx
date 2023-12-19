import React from 'react';
import { Link } from 'react-router-dom';
const SignUp = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">SignUp</h1>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Username" className="border rounded-lg p-3" id="username"/>
        <input type="email" placeholder="Email" className="border rounded-lg p-3" id="email"/>
        <input type="password" placeholder="Password" className="border rounded-lg p-3" id="password"/>
        <button className="bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-70">Sign up</button>
      </form>
      <div className="flex item-container gap-2">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;