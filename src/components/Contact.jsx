/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../apis';

const Contact = ({ listingData }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const fetchUserOrder = async () => {
    try {
      const res = await getUser();
      setLandlord(res.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserOrder();
  }, [listingData.userRef]);
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>Contact <span className='font-semibold'>{landlord.username}</span> for
            <span className='font-semibold'> {listingData?.name.toLowerCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={handleChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          >
          </textarea>
          <Link to={`mailto:${landlord.email}?subject=Regarding ${listingData.name}&body=${message}`}
            className='bg-slate-700 text-white p-3 text-center rounded-lg uppercase'
          >
                        Send Message
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;