import { useState } from 'react';
import { TextField, Typography } from '@mui/material';
import CustomButton from './CustomButton.js'

function CreateProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageURL: ''
});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Here, make a POST request to your backend with the formData
    try {
        const response = await fetch('http://localhost:5000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to create product');
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

  return (
    <form>
      <Typography variant="h4">Create new product</Typography>
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Price"
        name="price"
        value={formData.price}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Image"
        name="Image"
        value={formData.imageURL}
        onChange={handleChange}
      />
      {/* Add other fields as necessary */}
      <CustomButton variant="contained" color="primary" type="submit">
        Create Product
      </CustomButton>
    </form>
  );
}

export default CreateProduct;

