import React from 'react';
import ProductList from '../components/ProductList';
import Header from '../components/header.js';
import { useTheme } from '../context/ThemeContext.js';  // Corrected path
import { Button } from '@mui/material';
import { fetchProducts } from '../utils/fetchProducts';

const IndexPage = () => {
  const [products, setProducts] = React.useState([]);
  const { darkMode, setDarkMode } = useTheme();  // Destructured the theme context

  React.useEffect(() => {
    async function fetchData() {
      const products = await fetchProducts();
      setProducts(products);
    }

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <ProductList products={products} />
      <Button onClick={() => setDarkMode(!darkMode)}>
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </Button>
    </div>
  );
};

export default IndexPage;


