import React from 'react';
import { useState, useEffect } from 'react';
import { getListingAPI } from '../apis';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';


const Listing = () => {
  const [listingData, setListingData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();

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
        </>
      )}
    </div>
  );
};

export default Listing;