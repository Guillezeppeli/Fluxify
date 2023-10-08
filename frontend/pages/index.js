import { useState, useEffect } from 'react';
import ProductList from '../components/ProductList.js';
import Header from '../components/Header.js';
import SearchProducts from '../components/SearchProducts.js';
import { searchProductsByTerms } from '../utils/productServices.js';
import { fetchProducts } from '../utils/productServices.js';
import WelcomeModal from '../components/WelcomeModal.js';
import { useRouter } from 'next/router.js';

const IndexPage = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

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

  const handleSearch = async (searchTerm) => {
    try {
      const results = await searchProductsByTerms(searchTerm);
      setSearchResults(results || []); // Update the state with the search results
    } catch (error) {
      console.error("Error searching products:", error.message);
      setSearchResults([]);
    }
  };

  return (
    <div>
      <Header />
      <SearchProducts onSearch={handleSearch}/>
      {searchResults.map(product => (
        <div key={product._id}>
          {product.name} - ${product.price}
        </div>
      ))} 
      <ProductList products={products} />
      <WelcomeModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default IndexPage;


