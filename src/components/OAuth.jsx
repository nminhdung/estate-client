import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { signInWithGoogleAPI } from '../apis';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log('🚀 ~ file: OAuth.jsx:12 ~ handleGoogleClick ~ result:', result);
      const res = await signInWithGoogleAPI({
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL
      });
      dispatch(signInSuccess(res));
      navigate('/');
    } catch (error) {
      console.log('Could not sign in with google', error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 mb-3">
      CONTINUE WITH GOOGLE
    </button>
  );
};

export default OAuth;