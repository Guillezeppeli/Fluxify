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
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: ""
  });

  const validateFields = () => {
    const newErrors = {};
  
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
  
    setErrors(newErrors);
  
    // If there are errors, return false. Else, return true.
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateFields()) return; // Return early if validation fails
  
    try {
      const response = await registerUser(formData);
      console.log('Registration successful:', response);
      // Reset errors if any
      setErrors({
        name: "",
        email: "",
        password: ""
      });
      setError(null);
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
          error={Boolean(errors.name)}
          helperText={errors.name}
        />
        <TextField
          fullWidth
          margin="normal"
          placeholder='JohnDoe@example.com'
          label="Email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
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
          error={Boolean(errors.password)}
          helperText={errors.password}
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
