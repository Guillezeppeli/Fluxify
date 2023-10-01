import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    // any other default headers
  },
});

// Interceptor to attach the token to requests
instance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {  // Check if we're in the browser
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle 401 Unauthorized responses
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle the error and redirect to login page
      if (typeof window !== 'undefined') {
        window.location = '/';
      }
    } else if (error.response) {
      // Handle errors returned from the server
      console.error("Server Error:", error.response.data);
      if (error.response.status === 404) {
          // Handle not found error
          console.error("Not Found Error:", error.response.data);
      }
      // ... handle other status codes
    } else if (error.request) {
      // Handle errors that occurred while sending the request
      console.error("Request Error:", error.request);
    } else {
      // Handle other errors
      console.error("General Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;