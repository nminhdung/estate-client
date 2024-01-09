import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { updateListingAPI, getListingAPI } from '../apis';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateListing = () => {
  const { currentUser } = useSelector(state => state.user);
  const params = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    imageURLs: [],
    name: '',
    description: '',
    address: '',
    type: '',
    bedrooms: 1,
    bathrooms: 1,
    price: 0,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false
  });
  const [uploadLoading, setUploadLoading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  console.log('🚀 ~ file: CreateListing.jsx:12 ~ CreateListing ~ formData:', formData);
  const handleChange = (e) => {
    const { id, value, checked } = e.target;
    if (id === 'sale' || id === 'rent') {
      setFormData({ ...formData, type: id });
    }
    if (id === 'parking' || id === 'furnished' || id === 'offer') {
      setFormData({
        ...formData,
        [id]: checked
      });
    }
    if (e.target.type === 'text' || e.target.type === 'number' || e.target.type === 'textarea') {
      setFormData({
        ...formData,
        [id]: value
      });
    }
  };
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
        setFormData({ ...formData, imageURLs: formData.imageURLs.concat(urls) });
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
      imageURLs: formData.imageURLs.filter((url, idx) => index !== idx)
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.imageURLs.length < 1) {
        setError('You must upload at least one image');
        return;
      }
      if (!formData.type) {
        setError('Please choose Rent or Sale');
        return;
      }
      if (+formData.price < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await updateListingAPI(params.listingId, formData);
      if (!res.success) {
        setError('Can not update listing with some problems');
      }
      setLoading(false);
      navigate(`/listing/${res.rs._id}`);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  const fetchListingDetails = async () => {
    const res = await getListingAPI(params.listingId);
    setFormData({
      imageURLs: res.rs.imageURLs,
      name: res.rs.name,
      description: res.rs.description,
      address: res.rs.address,
      type: res.rs.type,
      bedrooms: res.rs.bedrooms,
      bathrooms:  res.rs.bathrooms,
      price: res.rs.price,
      discountPrice: res.rs.discountPrice,
      offer: res.rs.offer,
      parking: res.rs.parking,
      furnished: res.rs.furnished
    });
  };
  useEffect(() => {
    fetchListingDetails();
  }, []);
  return (
    <div className='p-3 max-w-4xl mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Update Listing</h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-2'>
        <div className="flex flex-col gap-4 flex-1  ">
          <input
            type="text"
            id='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Name'
            className='border rounded-lg p-3'
            required
          />
          <input
            type="textarea"
            id='description'
            value={formData.description}
            placeholder='Description'
            className='border rounded-lg p-3'
            required
            onChange={handleChange}
          />
          <input
            type="text"
            id='address'
            placeholder='Address'
            value={formData.address}
            onChange={handleChange}
            className='border rounded-lg p-3'
            required
          />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'sale'}
              />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type="number"
                className='p-3 border border-gray-400 rounded-lg'
                id="bedrooms"
                min='1'
                max='10'
                required
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type="number"
                className='p-3 border border-gray-400 rounded-lg'
                id="bathrooms"
                min='1'
                max='10'
                required
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className='flex items-center gap-2 '>
              <input
                type="number"
                className='p-3 border border-gray-400 rounded-lg'
                id="price"
                min='50'
                max='1000000'
                required
                onChange={handleChange}
                value={formData.price}
              />
              <div className='flex flex-col  items-center'>
                <p>Price</p>
                <span className='text-xs'>($/ month)</span>
              </div>
            </div>
            {formData.offer && (<div className='flex items-center gap-2 '>
              <input
                type="number"
                className='p-3 border border-gray-400 rounded-lg'
                id="discountPrice"
                min='0'
                max='100000'
                required
                onChange={handleChange}
                value={formData.discountPrice}
              />
              <div className='flex flex-col  items-center'>
                <p>Discounted Price</p>
                <span className='text-xs'>($/ month)</span>
              </div>
            </div>)}

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
            formData.imageURLs.length > 0 && formData.imageURLs.map((url, index) => {
              return (
                <div className='flex justify-between p-3 border items-center' key={index}>
                  <img src={url} alt='listing-image' className='w-20 h-20 object-cover rounded-lg' />
                  <button onClick={() => handleDeleteImage(index)} className='p-3 text-red-700 rounded-lg capitalize hover:opacity-95'>Delete</button>
                </div>
              );
            })
          }
          <button
            disabled={loading || uploadLoading}
            className='p-3 tracking-wide bg-slate-700 text-white rounded-lg uppercase hover:opacity-90'>
            {loading ? 'Updating...' : ' Update Listing'}
          </button>
          {error && <p className='text-red-700'>{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default UpdateListing;