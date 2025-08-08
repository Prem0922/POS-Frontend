import axios from 'axios';

// Create axios instance for live CRM backend (reusing CRM authentication)
const api = axios.create({
  baseURL: 'https://crm-n577.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'mysecretkey', // Same API key as CRM
  },
});

// Debug: Log the base URL to confirm it's correct
console.log('POS API Base URL:', api.defaults.baseURL);

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('pos_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem('pos_token');
      localStorage.removeItem('pos_userName');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const signup = async (email, password, name) => {
  const response = await api.post('/auth/signup', { email, password, name });
  return response.data;
};

export default api; 