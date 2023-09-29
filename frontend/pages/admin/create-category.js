import { useState, useEffect } from 'react';
import { 
  TextField, 
  List, 
  ListItem, 
  Typography,
  Menu,
  MenuItem,
  IconButton
 } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CustomButton from '../../components/CustomButton.js';
import DeleteButton from '../../components/DeleteButton.js'
import { 
  createCategory, 
  fetchCategories, 
  updateCategory, 
  deleteCategory,
  fetchSubcategories
  } from '../../utils/categoryServices.js';
import AdminDashboardLayout from './AdminDashboardLayout.js';

const CreateCategoryPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // For the dropdown menu position
  const [selectedCategory, setSelectedCategory] = useState(null); // The category whose dropdown is open
  const [subcategories, setSubcategories] = useState([]); // Subcategories of the selected category

  const handleCategorySubmit = async () => {
    try {
      const response = await createCategory({ name: categoryName });
      setMessage(`Successfully created category: ${response.name}`);
      setCategoryName(''); // Reset the input
      fetchAllCategories(); // Refresh the list
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleCategoryDelete = async (categoryId) => {
    const confirmed = window.confirm('Are you sure you want to delete this category?');
    if (confirmed) {
      try {
        await deleteCategory(categoryId);
        // Remove the category from the state
        const updatedCategories = categories.filter(cat => cat._id !== categoryId);
        setCategories(updatedCategories);
        alert('Category deleted successfully!');
      } catch (error) {
        alert('Failed to delete category:', error.message);
      }
    }
  }
  
  const fetchAllCategories = async () => {
    try {
      const allCategories = await fetchCategories();
      setCategories(allCategories);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const handleMenuOpen = async (category) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategory(category);
    try {
      const fetchedSubcategories = await fetchSubcategories(category._id);
      setSubcategories(fetchedSubcategories);
    } catch (error) {
      console.error("Error fetching subcategories:", error.message);
    }
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCategory(null);
    setSubcategories([]); // Clear the subcategories
  };
  

  return (
    <div style={{ alignItems: 'center'}}>
      <AdminDashboardLayout />
      <Typography variant="h4">Create Category</Typography>

      {message && <Typography color="error">{message}</Typography>}

      <TextField
        label="Category Name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <CustomButton variant="contained" color="primary" onClick={handleCategorySubmit}>
        Create
      </CustomButton>

      <Typography variant="h5" style={{ marginTop: '20px' }}>
        All Categories
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem key={category._id}>
            {category.name}
            <IconButton onClick={() => handleMenuOpen(category)}>
              <MoreVertIcon /> {/* This is the "three dots" icon from Material-UI */}
            </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl) && selectedCategory === category}
                onClose={handleMenuClose}
              >
                {subcategories.map(sub => (
                  <MenuItem key={sub._id}>{sub.name}</MenuItem>
                ))}
              </Menu>
            <DeleteButton onClick={() => handleCategoryDelete(category._id)}>Delete</DeleteButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CreateCategoryPage;
