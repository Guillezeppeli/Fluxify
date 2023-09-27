import { useState } from 'react';
import { TextField } from '@mui/material';
import CustomButton from './CustomButton.js'

function CreateProduct() {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    // ... other fields
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form>
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={productData.name}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Description"
        name="description"
        value={productData.description}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Price"
        name="price"
        value={productData.price}
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

