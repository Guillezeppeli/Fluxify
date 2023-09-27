import { useState, useEffect } from 'react';
import ProductList from '../components/ProductList.js';
import Header from '../components/Header.js'
import { fetchProducts } from '../utils/productServices.js';
import WelcomeModal from '../components/WelcomeModal.js';
import { useRouter } from 'next/router.js';

const IndexPage = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();
  
  useEffect(() => {
    if (router.query.welcome) {
        setModalOpen(true);
    }
}, [router.query.welcome]);

  useEffect(() => {
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
      <WelcomeModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default IndexPage;


