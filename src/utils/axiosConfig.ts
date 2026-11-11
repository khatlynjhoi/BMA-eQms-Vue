import axios from 'axios';

const links = [
  'http://127.0.0.1:8000/api/',
  'http://127.0.0.1:9090/api/',
  'http://api-eqms.bma.edu.ph/api/'
];

const envApiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL;
const production = links[2];
const testing = links[0];

const baseURL = envApiUrl || (import.meta.env.MODE === 'production' ? production : testing);

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Attach Sanctum Bearer Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem('laravel_api_token') ||
      localStorage.getItem('token');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Global 401 Unauthorized Session Expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('laravel_api_token');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;