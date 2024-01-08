import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Search = () => {
  const [filterSearchData, setFilterSearchData] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'createdAt',
    order: 'desc'
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value, checked } = e.target;
    if (id === 'all' || id === 'rent' || id === 'sale') {
      setFilterSearchData({ ...filterSearchData, type: id });
    }
    if (id === 'searchTerm') {
      setFilterSearchData({ ...filterSearchData, searchTerm: value });
    }
    if (id === 'parking' || id === 'furnished' || id === 'offer') {
      setFilterSearchData({ ...filterSearchData, [id]: checked || checked === 'true' ? true : false });
    }
    if (id === 'sort_order') {
      const sort = value.split('_')[0];
      const order = value.split('_')[1];
      setFilterSearchData({ ...filterSearchData, sort, order });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    Object.entries(filterSearchData).forEach(item => {
      urlParams.set(`${item[0].toString()}`, item[1]);
    });

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');
    if (
      searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl
    ) {
      setFilterSearchData({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'createdAt',
        order: orderFromUrl || 'desc'
      });
    }
  }, [location.search]);
  return (
    <div className='flex flex-col md:flex-row gap-2'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex gap-1 items-center'>
            <label className='whitespace-nowrap font-semibold'>Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className='border rounded-lg p-2 w-full'
              onChange={handleChange}
              value={filterSearchData.searchTerm}
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-1'>
              <input
                className='w-5'
                type='checkbox'
                id='all'
                onChange={handleChange}
                checked={filterSearchData.type === 'all'}
              />
              <span>Rent & Sale</span>
            </div>
            <div className='flex gap-1'>
              <input
                className='w-5'
                type='checkbox'
                id='rent'
                onChange={handleChange}
                checked={filterSearchData.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-1'>
              <input
                className='w-5'
                type='checkbox'
                id='sale'
                onChange={handleChange}
                checked={filterSearchData.type === 'sale'}
              />
              <span>Sale</span>
            </div>

            <div className='flex gap-1'>
              <input
                className='w-5'
                type='checkbox'
                id='offer'
                onChange={handleChange}
                checked={filterSearchData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Amenities:</label>
            <div className='flex gap-1'>
              <input
                className='w-5'
                type='checkbox'
                id='parking'
                onChange={handleChange}
                checked={filterSearchData.parking}
              />
              <span>Parking</span>
            </div>
            <div className='flex gap-1'>
              <input
                className='w-5'
                type='checkbox'
                id='furnished'
                onChange={handleChange}
                checked={filterSearchData.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select id='sort_order' className='border rounded-lg p-3'
              onChange={handleChange}
              defaultValue={'createdAt_desc'}
            >
              <option value='price_desc'>Price high to low</option>
              <option value='price_asc'>Price low to high</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <button
            type='submit'
            className='bg-slate-700 uppercase text-white hover:opacity-95 p-3 rounded-lg'>
                        Search
          </button>
        </form>
      </div>
      <div className=''>
        <h1 className='font-semibold text-3xl border-b p-3 text-slate-700 mt-5'>Listing results</h1>
      </div>
    </div>
  );
};

export default Search;