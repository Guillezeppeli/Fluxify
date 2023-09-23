import React from 'react';
import ProductList from '../components/ProductList';
import Header from '../components/header.js';
import { useThemeContext } from '../context/ThemeContext.js';  // Corrected path
import { Button } from '@mui/material';
import { fetchProducts } from '../utils/fetchProducts';

const IndexPage = () => {
  const [products, setProducts] = React.useState([]);

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
    </div>
  );
};

export default IndexPage;


