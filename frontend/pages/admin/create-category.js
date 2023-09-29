import { useState, useEffect, useRef, Fragment } from 'react';
import {
  Drawer,
  TextField, 
  List, 
  ListItem, 
  Typography,
  Menu,
  MenuItem
 } from '@mui/material';
import CustomButton from '../../components/CustomButton.js';
import CreateButton from '../../components/CreateButton.js';
import DeleteButton from '../../components/DeleteButton.js'
import { 
  createCategory, 
  fetchCategories, 
  updateCategory, 
  deleteCategory,
  fetchSubcategories,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory
  } from '../../utils/categoryServices.js';
import AdminDashboardLayout from './AdminDashboardLayout.js';

const CreateCategoryPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [updatedCategoryName, setUpdatedCategoryName] = useState('');
  const [message, setMessage] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // For the dropdown menu position
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);// The category whose dropdown is open
  const [subcategories, setSubcategories] = useState([]); // Subcategories of the selected category
  const [editingSubcategoryId, setEditingSubcategoryId] = useState(null);
  const [editedSubcategoryName, setEditedSubcategoryName] = useState('');
  const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] = useState(false);
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const startEditing = (event, category) => {
    event.stopPropagation(); 
    handleClose();
    setEditingCategoryId(category._id);
    setUpdatedCategoryName(category.name);
  };

  const handleUpdateCategory = async (categoryId) => {
    try {
      const updatedData = { name: updatedCategoryName };
      await updateCategory(categoryId, updatedData);
      fetchAllCategories();
      setEditingCategoryId(null);
    } catch (error) {
      console.error("Error updating category:", error);
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

  const fetchSubcategoriesForCategory = async (categoryId) => {
    try {
      const fetchedSubcategories = await fetchSubcategories(categoryId);
      setSubcategories(fetchedSubcategories);
    } catch (error) {
      console.error("Error fetching subcategories:", error.message);
    }
  };
  
  const handleClick = (event, categoryId) => {
    console.log("Clicked category ID:", categoryId);
    setAnchorEl(event.currentTarget);
    setSelectedCategoryId(categoryId);
    setIsMenuOpen(true);
    fetchSubcategoriesForCategory(categoryId);
    
  };

  useEffect(() => {
    console.log("Current selectedCategoryId:", selectedCategoryId);
  }, [selectedCategoryId]);

  const handleClose = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
  };

  const handleCreateSubcategory = async () => {
    try {
      await createSubcategory(selectedCategoryId, { subcategoryName: newSubcategoryName });
      closeSubcategoryModal();
      fetchSubcategoriesForCategory(selectedCategoryId);
    } catch (error) {
      console.error("Error creating subcategory:", error.message);
    }
  };

  const openSubcategoryModal = () => {
    setIsSubcategoryModalOpen(true);
  };
  
  const closeSubcategoryModal = () => {
    setIsSubcategoryModalOpen(false);
    setNewSubcategoryName(''); // reset the subcategory name
  };

  const handleUpdateSubcategory = async (subcategoryId, newName) => {
    try {
      const updatedData = { name: newName };
      console.log("Data being sent for update:", updatedData); // Log the data being sent
      await updateSubcategory(selectedCategoryId, subcategoryId, updatedData);
      fetchSubcategoriesForCategory(selectedCategoryId);  // Refresh the list
    } catch (error) {
      console.error("Error updating subcategory:", error.message);
    }
  };

  const handleSubcategoryDelete = async (subcategoryId) => {
    const confirmed = window.confirm('Are you sure you want to delete this subcategory?');
    if (confirmed) {
      try {
        await deleteSubcategory(selectedCategoryId, subcategoryId);
        // Remove the subcategory from the state
        const updatedSubcategories = subcategories.filter(subcat => subcat._id !== subcategoryId);
        setSubcategories(updatedSubcategories);
        alert('Subcategory deleted successfully!');
      } catch (error) {
        alert('Failed to delete subcategory:', error.message);
      }
    }
  }

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
      <CreateButton variant="contained" color="primary" onClick={handleCategorySubmit}>
        Create
      </CreateButton>

      <Typography variant="h5" style={{ marginTop: '20px' }}>
        All Categories
      </Typography>
      <List>
        {categories.map((category) => (
          <Fragment key={category._id}>
            {editingCategoryId === category._id ? (
              <>
                <TextField
                  value={updatedCategoryName}
                  onChange={(e) => setUpdatedCategoryName(e.target.value)}
                />
                <CustomButton onClick={() => handleUpdateCategory(category._id)}>Save</CustomButton>
                <CustomButton onClick={() => setEditingCategoryId(null)}>Cancel</CustomButton>
              </>
            ) : (
              <ListItem button onClick={(e) => handleClick(e, category._id)}>
                {category.name}
                <CustomButton onClick={(e) => startEditing(e, category)}>Edit</CustomButton>
                <DeleteButton onClick={() => handleCategoryDelete(category._id)}>
                  Delete
                </DeleteButton>
              </ListItem>
            )}

            {/* Dropdown menu */}
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleClose}
            >
              <Typography>Subcategories</Typography>
              {subcategories.map((subcategory) => (
                <MenuItem key={subcategory._id}>
                  {editingSubcategoryId === subcategory._id ? (
                  <TextField
                    autoFocus
                    value={editedSubcategoryName}
                    onChange={(e) => setEditedSubcategoryName(e.target.value)}
                  />
                ) : (
                  subcategory.name
                  )}
                  <div>
                    {editingSubcategoryId === subcategory._id ? (
                      <>
                        <CustomButton onClick=
                        {() => handleUpdateSubcategory(subcategory._id, editedSubcategoryName)}>
                          Save
                        </CustomButton>
                        <CustomButton onClick=
                        {() => setEditingSubcategoryId(null)}>
                          Cancel
                        </CustomButton>
                      </>
                    ) : (
                      <>
                        <CustomButton onClick={() => {
                          setEditingSubcategoryId(subcategory._id);
                          setEditedSubcategoryName(subcategory.name);
                        }}>
                          Edit
                        </CustomButton>
                        <DeleteButton onClick=
                        {() => handleSubcategoryDelete(subcategory._id)}>
                          Delete
                        </DeleteButton>
                      </>
                    )}
                  </div>
                </MenuItem>
              ))}
              <CreateButton onClick={openSubcategoryModal}>Create subcategory</CreateButton>
            </Menu>
  
            <Drawer 
            anchor="right" 
            open={isSubcategoryModalOpen} 
            onClose={closeSubcategoryModal}
            >

              <div style={{ width: 400, padding: 20 }}> {/* You can adjust the width and padding */}
                <Typography variant="h6" style={{ marginBottom: 16 }}>
                    Create Subcategory
                </Typography>
                  <TextField
                      autoFocus
                      in
                      variant="outlined"
                      margin="dense"
                      label="Subcategory Name"
                      fullWidth
                      value={newSubcategoryName}
                      onChange={(e) => setNewSubcategoryName(e.target.value)}
                    />
                  <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
                    <CustomButton onClick={closeSubcategoryModal} color="primary" style={{ marginRight: 8 }}>
                        Cancel
                    </CustomButton>
                    <CustomButton onClick={handleCreateSubcategory} color="primary">
                        Create
                    </CustomButton>
                  </div>
              </div>
            </Drawer>
          </Fragment>
        ))}
      </List>
    </div>
  );
};

export default CreateCategoryPage;
