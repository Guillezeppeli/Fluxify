import { useState, useEffect } from 'react';
import { 
  TextField, 
  Typography,
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel 
} from '@mui/material';
import CreateButton from './CreateButton.js'
import { createProduct } from '../utils/productServices.js';
import { fetchCategories, fetchSubcategories } from '../utils/categoryServices.js';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState('');

  const handleProductSubmit = async () => {
    try {
      const productData = {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        imageURL,
        categoryId: selectedCategoryId,           // Ensure this is added
        subcategoryId: selectedSubcategoryId 
      };

      console.log("Sending data:", productData);
      
      const response = await createProduct(productData);
      console.log('Product created:', response);
    } catch (error) {
      console.error('Error creating product:', error.message);
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };

    loadCategories();
  }, []);

  const handleCategoryChange = async (event) => {
    const categoryId = event.target.value;
    console.log("Selected category ID:", categoryId);  // Corrected the variable name here
    setSelectedCategoryId(categoryId);
    setSelectedSubcategoryId('');
    
    // Fetch subcategories for the selected category
    try {
      const fetchedSubcategories = await fetchSubcategories(categoryId);  // Use the categoryId from the current selection
      setSubcategories(fetchedSubcategories);
    } catch (error) {
      console.error("Error fetching subcategories:", error.message);
    }
};


  return (
    <div>
      <Typography variant="h4">Create Product</Typography>
      
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        fullWidth
        margin="normal"
        type="number"
      />

      <TextField
        label="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        fullWidth
        margin="normal"
        type="number"
      />

      <TextField
        label="Image URL"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
        fullWidth
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategoryId}
          onChange={handleCategoryChange}
        >
          {categories.map(category => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant='outlined' fullWidth margin="normal">
        <InputLabel>Subcategory</InputLabel>
        <Select
          value={selectedSubcategoryId || ''}
          onChange={(e) => setSelectedSubcategoryId(e.target.value)}
          label="Subcategory"
        >
          {subcategories.map(subcategory => (
            <MenuItem key={subcategory._id} value={subcategory._id}>
              {subcategory.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <CreateButton variant="contained" color="primary" onClick={handleProductSubmit} style={{ marginTop: '20px' }}>
        Create Product
      </CreateButton>
    </div>
  );
};

export default CreateProduct;

