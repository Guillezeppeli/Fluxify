import { useState, useEffect } from 'react';
import { 
  TextField,
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Button
} from '@mui/material';
import SearchProducts from '../components/SearchProducts';
import CustomButton from './CustomButton.js'
import DeleteButton from '../components/DeleteButton'
import { createProduct, updateProduct, deleteProduct } from '../utils/productServices.js';
import { fetchCategories, fetchSubcategories } from '../utils/categoryServices.js';

const CreateProduct = ({ initialProductData }) => {
  const [currentProduct, setCurrentProduct] = useState(initialProductData);
  const [name, setName] = useState(currentProduct?.name || '');
  const [description, setDescription] = useState(currentProduct?.description || '');
  const [price, setPrice] = useState(currentProduct?.price || '');
  const [stock, setStock] = useState(currentProduct?.stock || '');
  const [imageURL, setImageURL] = useState(currentProduct?.imageURL || '');
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(currentProduct?.categoryId || '');
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(currentProduct?.subcategoryId || '');
  const [mode, setMode] = useState(initialProductData ? "edit" : "create");
  const [showSearch, setShowSearch] = useState(false);
  

  const handleProductSubmit = async () => {
    try {
      const productData = {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        imageURL,
        categoryId: selectedCategoryId,
        subcategoryId: selectedSubcategoryId 
      };

      console.log("Sending data:", productData);
      
      if (mode === "create") {
        const response = await createProduct(productData);
        console.log('Product created:', response);
      } else if (mode === "edit" && currentProduct) {
        const response = await updateProduct(currentProduct._id, productData);
        console.log('Product updated:', response);
      }
    } catch (error) {
      console.error('Error handling product:', error.message);
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
    setSelectedCategoryId(categoryId);
    setSelectedSubcategoryId('');
    
    // Fetch subcategories for the selected category
    try {
      const fetchedSubcategories = await fetchSubcategories(categoryId);
      setSubcategories(fetchedSubcategories);
    } catch (error) {
      console.error("Error fetching subcategories:", error.message);
    }
};

const handleProductSelection = (selectedProduct) => {
  setCurrentProduct(selectedProduct);
  setName(selectedProduct.name);
  setDescription(selectedProduct.description);
  setPrice(selectedProduct.price);
  setStock(selectedProduct.stock);
  setImageURL(selectedProduct.imageURL);
  setSelectedCategoryId(selectedProduct.category?._id);
  setSelectedSubcategoryId(selectedProduct.subcategory?._id);

  setShowSearch(false); // Hide the search after selection
};

const handleDeleteProduct = async () => {
  if (!currentProduct) {
    console.error("No product selected for deletion.");
    return;
  }

  const confirmation = window.confirm(`Are you sure you want to delete ${currentProduct.name}?`);

  if (!confirmation) return;

  try {
    await deleteProduct(currentProduct._id);
    console.log("Product deleted successfully.");
    setCurrentProduct(null); // Clear the selected product
  } catch (error) {
    console.error("Error deleting product:", error.message);
  }
};

const toggleMode = () => {
  setMode(prevMode => prevMode === "create" ? "edit" : "create");
  setCurrentProduct(null);  // Clear the current product when switching to create mode
};

  return (
    <div>
      <h2>
        {mode === "create" 
          ? "Create New Product" 
          : currentProduct 
            ? `Editing: ${currentProduct.name}` 
            : 'Select a product to edit'}
      </h2>

      {mode === "edit" && <SearchProducts onProductSelect={handleProductSelection} />}

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
        {mode === "edit" && currentProduct && (
          <div className="product-details">
          </div>
        )}
          <InputLabel>Category</InputLabel>
          <Select
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
          <CustomButton onClick={handleProductSubmit}>
          {mode === "create" ? "Create" : "Update"}
        </CustomButton>
        {mode === "edit" && currentProduct && (
        <DeleteButton 
          variant="contained" 
          color="secondary" 
          onClick={handleDeleteProduct}
          style={{ marginLeft: '10px' }}
        >
          Delete Product
        </DeleteButton>
      )}
        <Button onClick={toggleMode} style={{ marginTop: '10px' }}>
          Toggle Mode (Current: {mode})
        </Button>
    </div>
  );
};

export default CreateProduct;

