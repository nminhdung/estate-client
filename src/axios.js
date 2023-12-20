import axios from 'axios';
import { API_ROOT } from './utils/constants.js';

const instance =axios.create({
  baseURL: `${API_ROOT}/api`
});

instance.defaults.withCredentials = true;

export default instance;