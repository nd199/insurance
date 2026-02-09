import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.config.method?.toUpperCase()} ${response.config.url} - Status: ${response.status}`);
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      console.error(`Error ${status}:`, data);
      
      // Handle specific error codes
      if (status === 401) {
        // Unauthorized - redirect to login
        window.location.href = '/login';
      } else if (status === 403) {
        // Forbidden - redirect to unauthorized page
        window.location.href = '/unauthorized';
      } else if (status === 404) {
        // Not found
        error.message = 'Resource not found';
      } else if (status >= 500) {
        // Server error
        error.message = 'Server error. Please try again later.';
      } else {
        // Client error
        error.message = data?.message || 'An error occurred';
      }
    } else if (error.request) {
      // Network error
      console.error('Network Error:', error.request);
      error.message = 'Network error. Please check your connection.';
    } else {
      // Other error
      console.error('Error:', error.message);
      error.message = 'An unexpected error occurred';
    }
    
    return Promise.reject(error);
  }
);

export default api;
