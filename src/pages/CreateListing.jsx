import React from 'react';
import { listOption } from '../utils/constants';


const CreateListing = () => {
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
            <input type='file' id='images' className='p-3 border border-gray-500 rounded w-full' accept='image/*' multiple />
            <button
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80' >
                            Upload
            </button>
          </div>
          <button className='p-3 tracking-wide bg-slate-700 text-white rounded-lg uppercase hover:opacity-90'>Create Listing</button>
        </div>
      </form>
    </div>
  );
};

export default CreateListing;