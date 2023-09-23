import React from 'react';
import ProductList from '../components/ProductList';
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
      <ProductList products={products} />
    </div>
  );
};

export default IndexPage;