import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';

const rawBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const normalizedBase =
  rawBase.endsWith('/api') || rawBase.includes('/api/')
    ? rawBase
    : `${rawBase.replace(/\/+$/, '')}/api`;

const api = axios.create({
  baseURL: normalizedBase,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (typeof window !== 'undefined' && error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
