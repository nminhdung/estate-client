import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { app } from '../firebase';
import { listOption } from '../utils/constants';


const CreateListing = () => {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: []
  });
  const [uploadLoading, setUploadLoading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState('');
  console.log('🚀 ~ file: CreateListing.jsx:12 ~ CreateListing ~ formData:', formData);
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleImageUpload = (e) => {
    e.preventDefault();
    if (images.length > 0 && images.length < 7) {
      setUploadLoading(true);
      setImageUploadError('');
      const promises = [];
      for (let i = 0; i < images.length; i++) {
        promises.push(storeImage(images[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
        setUploadLoading(false);
        setImageUploadError('');
      }).catch((err) => {
        setImageUploadError('Image upload failed (2 mb max per image) ');
        setUploadLoading(false);
      });
    }
    else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploadLoading(false);
    }
  };
  const handleDeleteImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((url, idx) => index !== idx)
    });
  };
  return (
    <div className='p-3 max-w-4xl mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Create Listing</h1>
      <form className='flex flex-col sm:flex-row gap-2'>
        <div className="flex flex-col gap-4 flex-1  ">
          <input type="text" id='name' placeholder='Name' className='border rounded-lg p-3' required />
          <input type="textarea" id='description' placeholder='Description' className='border rounded-lg p-3' required />
          <input type="text" id='address' placeholder='Address' className='border rounded-lg p-3' required />
          <div className='flex gap-6 flex-wrap'>
            {listOption?.map((option) => {
              return <div key={option.id} className='flex gap-2'>
                <input type='checkbox' id={option.value.toLowerCase()} className='w-5' />
                <span className='capitalize'>{option.name}</span>
              </div>;
            })}
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input type="number" className='p-3 border border-gray-400 rounded-lg' id="bedrooms" min='1' max='10' required />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input type="number" className='p-3 border border-gray-400 rounded-lg' id="bathrooms" min='1' max='10' required />
              <p>Baths</p>
            </div>
            <div className='flex items-center gap-2 '>
              <input type="number" className='p-3 border border-gray-400 rounded-lg' id="price" min='1' max='10' required />
              <div className='flex flex-col  items-center'>
                <p>Price</p>
                <span className='text-xs'>($/ month)</span>
              </div>
            </div>
            <div className='flex items-center gap-2 '>
              <input type="number" className='p-3 border border-gray-400 rounded-lg' id="discountprice" min='1' max='10' required />
              <div className='flex flex-col  items-center'>
                <p>Discounted Price</p>
                <span className='text-xs'>($/ month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>Images:
            <span className='font-normal text-gray-700 ml-2'>The first image will be the cover (max:6)</span>
          </p>
          <div className='flex gap-4 items-center'>
            <input onChange={e => setImages(e.target.files)} type='file' id='images' className='p-3 border border-gray-500 rounded w-full' accept='image/*' multiple />
            <button
              disabled={uploadLoading}
              type='submit'
              onClick={handleImageUpload}
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80' >
              {uploadLoading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p>
          {
            formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => {
              return (
                <div className='flex justify-between p-3 border items-center' key={index}>
                  <img src={url} alt='listing-image' className='w-20 h-20 object-cover rounded-lg' />
                  <button onClick={() => handleDeleteImage(index)} className='p-3 text-red-700 rounded-lg capitalize hover:opacity-95'>Delete</button>
                </div>
              );
            })
          }
          <button className='p-3 tracking-wide bg-slate-700 text-white rounded-lg uppercase hover:opacity-90'>Create Listing</button>
        </div>
      </form>
    </div>
  );
};

export default CreateListing;