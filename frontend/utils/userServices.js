import instance from '../utils/axiosConfig.js'; // Adjust the path accordingly

export const registerUser = async (userData) => {
  try {
    const response = await instance.post('/users/register', userData);
    const data = response.data;
    
    const token = data.token;

    if (token) {
      localStorage.setItem('token', token);
    } else {
      console.error("Token not present in registration response:", data);
    }
    return data;
  } catch (error) {
    console.error("API call failed:", error);
    // Extract error message from API response or fall back to a generic message
    const errorMessage = error.response?.data?.message || 'Failed to register.';
    throw new Error(errorMessage);
  }
}

export const loginUser = async (credentials) => {
  try {
    const response = await instance.post('/users/login', credentials);
    const data = response.data;

    const token = data.token;

    if (token) {
      localStorage.setItem('token', token);
    } else {
      console.error("Token not present in login response:", data);
    }

    return data;
  } catch (error) {
    console.error("API call failed:", error);
    // Extract error message from API response or fall back to a generic message
    const errorMessage = error.response?.data?.message || 'Failed to login.';
    throw new Error(errorMessage);
  }
}
