import axios from 'axios';

const backendURL = import.meta.env.VITE_BACKEND_URL || '';

const axiosInstance = axios.create({
  baseURL: `${backendURL}/api`,
  withCredentials: true,
});

export default axiosInstance;
