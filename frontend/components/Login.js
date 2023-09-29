import React, { useState } from 'react';
import { useUserContext  } from '../context/UserContext.js';
import { TextField, Typography } from '@mui/material';
import { loginUser } from '../utils/userServices.js';
import { useRouter } from 'next/router';
import CustomButton from './CustomButton.js';
import WelcomeModal from './WelcomeModal.js';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { setUser } = useUserContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateFields = () => {
    if (!formData.email || !formData.password) {
      setError("All fields are required.");
      return false;
    }
    return true;
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return; // Return early if validation fails

    try {
      const response = await loginUser(formData);
      localStorage.setItem('user', JSON.stringify(response.user));
      setError(null);
      setUser(response.user);

      if (response.user.isAdmin) {
        router.push('/admin'); // redirect to admin dashboard
      } else {
      //Redirect to homepage
      setShowModal(true);
      router.push('/'); // redirect to homepage
      }    
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-md">
        <Typography variant="h5">Login</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          fullWidth
          margin="normal"
          placeholder='JohnDoe@example.com'
          label="Email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <div className='pt-3'>
          <CustomButton 
            type="submit" 
            variant="contained" 
            color='primary'
          > 
            Login
          </CustomButton>
        </div>
      </form>
      { showModal && <WelcomeModal open={true} onClose={() => setShowModal(false)} /> }
    </div>
  );
};

export default Login;
