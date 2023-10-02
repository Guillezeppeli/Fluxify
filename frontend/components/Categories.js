import React, { Fragment, useState, useEffect } from 'react';
import { fetchCategories, fetchSubcategories } from '../utils/categoryServices.js';
import { 
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';


function Categories({ isOpen, onClose }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Failed to fetch categories:', error.message);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
  }, [selectedCategoryId]);


  const handleCategoryClick = async (categoryId) => {
    console.log("Clicked Category ID:", categoryId);
    setSelectedCategoryId(categoryId);
    try {
        const fetchedSubcategories = await fetchSubcategories(categoryId);
        console.log("Fetched Subcategories:", fetchedSubcategories); // Log the fetched data
        setSubcategories(fetchedSubcategories);
    } catch (error) {
        console.error("Error fetching subcategories:", error.message);
    }
};

  return (
    <div style={{ position: 'absolute', top: 0, left: 0 }}>
  
      {/* Sidebar */}
      <Drawer
        variant="persistent" // Changed from 'permanent' to 'temporary' for toggle functionality
        open={isOpen}
        onMouseLeave={onClose}
        anchor="left"
        style={{ width: '240px', flexShrink: 0 }}
      >
        <List>
          {categories.map(category => (
            <Fragment key={category._id}>
                <ListItem button onClick={() => handleCategoryClick(category._id)}>
                    <ListItemText primary={category.name} />
                </ListItem>
                {/* Render subcategories only if this category is the selected one */}
                {selectedCategoryId === category._id && subcategories.map(subcategory => (
                    <ListItem button key={subcategory._id} style={{ marginLeft: '20px' }}>
                        <ListItemText primary={subcategory.name} />
                    </ListItem>
                ))}
            </Fragment>
          ))}
        </List>
      </Drawer>
    </div>
  );  
}

export default Categories;
