import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import {
  updateUserPending,
  updateSuccess,
  updateFailed,
  deleteUserPending,
  deleteSuccess,
  deleteFailed,
  signOutPending,
  signOutSuccess,
  signOutFailed
} from '../redux/user/userSlice.js';
import { Link } from 'react-router-dom';
import { app } from '../firebase';
import {
  updateUserAPI,
  deleteUserAPI,
  signOutAPI,
  getListingsByUser,
  deleteListingAPI
} from '../apis/index.js';


const Profile = () => {
  const fileRef = useRef();
  const { currentUser, loading, error } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [filePercent, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [successUpdate, setSuccesUpdate] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  console.log('🚀 ~ file: Profile.jsx:14 ~ Profile ~ formData:', formData);
  //firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercent(Math.round(progress));
      },
      (error) => {
        setFileUploadError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );


  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserPending());
      const res = await deleteUserAPI(currentUser._id);
      if (res.success) {
        dispatch(deleteSuccess());
      } else {
        dispatch(deleteFailed('Can not delete'));

      }
    } catch (error) {
      dispatch(deleteFailed('Can not delete'));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserPending());
      const res = await updateUserAPI(currentUser._id, { ...formData });
      if (res.success === true) {
        dispatch(updateSuccess(res.rs));
        setSuccesUpdate(true);
      }
      else {
        dispatch(updateFailed('Can not update user'));
        return;
      }
    } catch (error) {
      dispatch(updateFailed('Can\'t not update with some problems'));
    }
  };
  const handleSignout = async () => {
    try {
      dispatch(signOutPending());
      const res = await signOutAPI();
      dispatch(signOutSuccess());
    } catch (error) {
      dispatch(signOutFailed('Can not sign out with some problems'));
    }
  };
  const handleShowListings = async () => {
    try {
      const res = await getListingsByUser(currentUser._id);
      if (!res.success) {
        setShowListingsError(true);
        return;
      }
      setUserListings(res.result);
    } catch (error) {
      setShowListingsError(true);
    }
  };
  const handleDeleteListing = async (listingId) => {
    try {
      const res = await deleteListingAPI(listingId);
      if (res.success) {
        setUserListings(prev =>
          prev.filter(listing => listing._id !== listingId)
        );
      } else {
        alert('Can not delete listing');
      }

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  return (
    <div className='max-w-lg mx-auto '>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='file'
          ref={fileRef}
          hidden accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img src={formData?.avatar || currentUser.avatar} alt='avatar' onClick={() => fileRef.current.click()}
          className='rounded-full w-24 h-24 object-cover cursor-pointer self-center'
        />
        <p className='text-sm self-center'>
          {fileUploadError ? <span className='text-red-700'>Error image upload (image must be less than 2mb)</span> :
            filePercent > 0 && filePercent < 100 ? (
              <span>{`Uploading ${filePercent}%`}</span>
            ) : filePercent === 100 ? (<span className='text-green-700'>Successfully uploaded</span>) :
              ''
          }
        </p>
        <input
          type="text"
          placeholder='username'
          id='username'
          className='border p-3 rounded-lg'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder='email'
          id='email'
          className='border p-3 rounded-lg'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder='password'
          id='password'
          className='border p-3 rounded-lg'
          defaultValue={currentUser.password}
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 uppercase hover:opacity-95 disabled:opacity-80 rounded-lg">
          {loading ? 'Loading...' : 'Update'}
        </button>
        <Link to={'/create-listing'} className="bg-green-700 text-white p-3 rounded-lg capitalize text-center hover:opacity-95">
          Create Listing
        </Link>
      </form>
      <div className='flex items-center justify-between mt-5'>
        <span className='text-red-600 cursor-pointer text-[16px]' onClick={handleDeleteUser}>Delete Account?</span>
        <span className='text-red-600 cursor-pointer text-[16px]' onClick={handleSignout}>Sign out</span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-600'>{successUpdate ? 'Update successfully' : ''}</p>
      <button onClick={handleShowListings} className='text-green-700 w-full'>
        Show listings
      </button>
      <p className='text-red-700 mt-5'>{showListingsError ? 'Error showing listings' : ''}</p>
      {userListings && userListings.length > 0 &&
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt -7 text-2xl font-semibold'>Your Listings</h1>
          {
            userListings?.map((listing) => {
              return (
                <div key={listing._id} className='border flex justify-between items-center p-3 gap-2'>
                  <Link to={`/listing/${listing._id}`}>
                    <img src={listing.imageURLs[0]} alt="listing url" className='w-16 h-16 object-cover' />
                  </Link>
                  <Link className='flex-1' to={`/listing/${listing._id}`}>
                    <p className='text-slate-700 font-semibold capitalize hover:underline truncate'>{listing.name}</p>
                  </Link>
                  <div className='flex flex-col items-center'>
                    <button onClick={() => handleDeleteListing(listing._id)} className='text-red-700 uppercase hover:underline'>Delete</button>
                    <Link to={`/update-listing/${listing._id}`}>
                      <button className='text-green-700 uppercase hover:underline'>
                        Edit
                      </button>
                    </Link>
                  </div>
                </div>
              )
              ;
            })
          }
        </div>

      }
    </div>
  );
};

export default Profile;