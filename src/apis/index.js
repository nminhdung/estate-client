// import axios from 'axios';

import axiosIntansce from '../axios.js';
export const signUpAPI = async (data) => {
  const response = await axiosIntansce({
    url: '/auth/signup',
    method: 'post',
    data
  });
  return response.data;
};

export const signInAPI = async (data) => {
  const response = await axiosIntansce({
    url: '/auth/signin',
    method: 'post',
    data
  });
  return response.data;
};
export const signInWithGoogleAPI = async (data) => {
  const response = await axiosIntansce({
    url: '/auth/google',
    method: 'post',
    data
  });
  return response.data;
};