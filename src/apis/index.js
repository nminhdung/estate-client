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
export const updateUserAPI = async (userId, data) => {
  const response = await axiosIntansce({
    url: `/user/update/${userId}`,
    method: 'put',
    data
  });
  return response.data;
};
export const deleteUserAPI = async (userId) => {
  const response = await axiosIntansce({
    url: `/user/delete/${userId}`,
    method: 'delete'
  });
  return response.data;
};
export const getListingsByUser = async (userId) => {
  const response = await axiosIntansce({
    url:`/user/listings/${userId}`,
    method:'get'
  });
  return response.data;
};
export const getUser = async() => {
  const response = await axiosIntansce({
    url:'/user/get-user',
    method:'get'
  });
  return response.data;
};
export const signOutAPI = async () => {
  const response = await axiosIntansce({
    url: '/auth/signout',
    method: 'get'
  });
  return response.data;
};
export const createListingAPI = async (data) => {
  const response = await axiosIntansce({
    url: '/listing/create',
    method: 'post',
    data
  });
  return response.data;
};
export const deleteListingAPI = async (listingId) => {
  const response = await axiosIntansce({
    url: `/listing/delete/${listingId}`,
    method: 'delete'
  });
  return response.data;
};
export const getListingAPI = async (listingId) => {
  const response = await axiosIntansce({
    url: `/listing/get-listing/${listingId}`,
    method: 'get'
  });
  return response.data;
};
export const updateListingAPI = async (listingId, data) => {
  const response = await axiosIntansce({
    url: `/listing/update/${listingId}`,
    method: 'put',
    data
  });
  return response.data;
};