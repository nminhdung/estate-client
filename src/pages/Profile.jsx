import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';


const Profile = () => {
  const fileRef = useRef();
  const { currentUser } = useSelector(state => state.user);
  const [file, setFile] = useState(null);
  const [filePercent, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
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
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  return (
    <div className='max-w-lg mx-auto '>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input
          type='file'
          ref={fileRef}
          hidden accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img src={formData.avatar || currentUser.avatar} alt='avatar' onClick={() => fileRef.current.click()}
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