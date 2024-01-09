/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { IoLocationOutline } from 'react-icons/io5';

const ListingItem = ({ listing }) => {
  return (
    <div className='flex flex-col w-full bg-white shaodw-md
    hover:shadow-lg transition-shadow duration-300 overflow-hidden rounded-lg'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageURLs[0]}
          alt='image'
          className='h-[300px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300' />
        <div className='p-3 flex flex-col gap-2'>
          <p className='text-lg font-semibold text-slate-700 truncate'>{listing.name}</p>
          <div className='flex items-center gap-2'>
            <IoLocationOutline className=' text-green-600' />
            <p className='text-sm text-gray-600 line-clamp-1 w-full'>{listing.address}</p>
          </div>
          <p className='w-full line-clamp-2 text-sm text-gray-600'>{listing.description}</p>
          <p className='text-slate-500 mt-2 font-semibold flex justify-between'>
                        ${listing.offer ?
              (+listing.price - +listing.discountPrice).toLocaleString('en-US') :
              listing.price.toLocaleString('en-US')
            }
            {listing.type === 'rent' && '/month'}
            {listing.offer && <span className='font-bold text-black'>
                            ${listing.discountPrice.toLocaleString('en-US')} off
            </span>}
          </p>
          <div className='flex gap-4 items-center'>
            <span className='font-bold text-sm'>
              {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
            </span>
            <span className='font-bold text-sm'>
              {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;