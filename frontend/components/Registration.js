import React, { useState } from 'react';
import { registerUser } from '../utils/userServices.js';
import { TextField, Typography } from '@mui/material';
import CustomButton from './CustomButton.js';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      console.log('Registration successful:', response);
      // Redirect or show success message
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-md">
        <Typography variant="h5">Register</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          placeholder='JohnDoe@example.com'
          label="Email"
          variant="outlined"
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
            Register
          </CustomButton>
        </div>

      </form>
    </div>
  );
};

export default Registration;
