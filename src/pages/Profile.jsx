import React from 'react';
import { useSelector } from 'react-redux';


const Profile = () => {
  const { currentUser } = useSelector(state => state.user);
  return (
    <div className='max-w-lg mx-auto '>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt='avatar'
          className='rounded-full w-24 h-24 object-cover cursor-pointer self-center'
        />
        <input type="text" placeholder='username' id='username' className='border p-3 rounded-lg' />
        <input type="email" placeholder='email' id='email' className='border p-3 rounded-lg' />
        <input type="password" placeholder='password' id='password' className='border p-3 rounded-lg' />
        <button
          className="bg-slate-700 text-white p-3 uppercase hover:opacity-95 disabled:opacity-80 rounded-lg">
          Update
        </button>
      </form>
      <div className='flex items-center justify-between mt-5'>
        <span className='text-red-600 cursor-pointer text-[16px]'>Delete Account?</span>
        <span className='text-red-600 cursor-pointer text-[16px]'>Sign out</span>
      </div>
    </div>
  );
};

export default Profile;