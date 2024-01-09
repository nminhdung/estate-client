import React from 'react';
import { useState, useEffect } from 'react';
import { getListingAPI } from '../apis';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { IoLocationOutline } from 'react-icons/io5';
import { FaBed } from 'react-icons/fa6';
import { FaBath, FaParking, FaChair } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import 'swiper/css/bundle';
import Contact from '../components/Contact';


const Listing = () => {
  const [listingData, setListingData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector(state => state.user);

  const fetchListingDetails = async () => {
    try {
      setLoading(true);
      const res = await getListingAPI(params.listingId);
      if (!res.success) {
        setError(true);
        setLoading(false);
        return;
      }
      setListingData(res.rs);
      setLoading(false);
      setError(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    fetchListingDetails();
  }, [params.listingId]);
  return (
    <div>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && <p className="text-center my-7 text-2xl text-red-500">Something went wrong!!!</p>}
      {listingData && !loading && !error && (
        <>
          <Swiper modules={[Navigation]} navigation={true}>
            {listingData?.imageURLs?.map((url, index) => {
              return <SwiperSlide key={url}>
                <div className="h-[550px] w-full" >
                  <img src={url} alt='image' className='w-full h-full object-cover' />
                </div>

              </SwiperSlide>;
            })}
          </Swiper>
          <div className='w-[1200px]  mx-auto px-3 md:px-0 flex flex-col gap-4 my-7'>
            <h1 className='font-semibold text-2xl'>
              {listingData?.name} - ${' '}
              {listingData.offer
                ? (+listingData.price - +listingData.discountPrice).toLocaleString('en-us')
                : listingData?.price?.toLocaleString('en-us')}
              {listingData.type === 'rent' && ' / month'}
            </h1>
            <div className='flex items-center gap-2'>
              <IoLocationOutline color={'green'} />
              <p className='text-base text-slate-500'>{listingData?.address}</p>
            </div>
            <div className='flex items-center gap-2'>
              <p className='capitalize text-white px-3 py-1 max-w-[200px] w-full  bg-red-600 rounded-md text-center'>
                {listingData?.type === 'rent' ? 'for rent' : 'for sale'}
              </p>
              {listingData?.offer &&
                <p className='capitalize text-white px-3 py-1 max-w-[200px] w-full  bg-green-600 rounded-md text-center'>
                  $ {+listingData.price - +listingData.discountPrice} OFF
                </p>}
            </div>
            <div className=''>
              <span className='font-semibold text-black'>Description - </span>
              <span className='text-slate-600 text-justify'> {listingData?.description}</span>
            </div>
            <div className='flex gap-4 items-centered'>
              <p className="flex items-center gap-2">
                <FaBed color={'green'} size={20} />
                <span className='text-green-600 font-semibold'>
                  {listingData.bedrooms > 1 ? `${listingData.bedrooms} beds` : `${listingData.bedrooms} bed`}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <FaBath color={'green'} size={20} />
                <span className='text-green-600 font-semibold'>
                  {listingData.bathrooms > 1 ? `${listingData.bathrooms} baths` : `${listingData.bathrooms} bath`}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <FaParking color={`${listingData.parking ? 'green' : 'black'}`} size={20} />
                <span className={`${listingData?.parking ? 'text-green-600' : 'text-black'} font-semibold`}>
                  {listingData?.parking ? 'Parking spot' : 'No parking'}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <FaChair color={`${listingData.furnished ? 'green' : 'black'}`} size={20} />
                <span className={`${listingData?.furnished ? 'text-green-600' : 'text-black'} font-semibold`}>
                  {listingData?.furnished ? 'Furnished' : 'Unfurnished'}
                </span>
              </p>
            </div>
            {currentUser && currentUser._id !== listingData?.userRef && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-slate-700 p-3 rounded-lg  text-white uppercase hover:opacity-95'
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact listingData={listingData} />}
          </div>
        </>
      )}
    </div>
  );
};

export default Listing;