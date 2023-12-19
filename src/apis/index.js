import axios from 'axios';
import { API_ROOT } from '../utils/constants';

export const signUpAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/api/auth/signup`, data);
  return response.data;
};