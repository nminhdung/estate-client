import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpAPI } from '../apis';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [messError, setMessError] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signUpAPI(formData);
      console.log(res);
      if (res.result !== null) {
        setLoading(false);
        navigate('/sign-in');

      }
    } catch (error) {
      setLoading(false);
      setMessError('Can not signup with some problems');
    }


  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">SignUp</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Username" className="border rounded-lg p-3" id="username" onChange={e => handleChange(e)} />
        <input type="email" placeholder="Email" className="border rounded-lg p-3" id="email" onChange={e => handleChange(e)} />
        <input type="password" placeholder="Password" className="border rounded-lg p-3" id="password" onChange={e => handleChange(e)} />
        <button
          disabled={loading}
          className="bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-70"
        >
          {loading ? 'Loading' : 'Sign up'}
        </button>
      </form>
      <div className="flex item-container gap-2">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
      {messError && <p className='text-red-500'>{messError}</p>}
    </div>
  );
};

export default SignUp;