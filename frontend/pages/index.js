import React from 'react';
import ProductList from '../components/ProductList.js';
import Header from '../components/header.js';
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


