import React, { useState } from 'react';
import AdminDashboardLayout from "./AdminDashboardLayout.js";
import SearchProducts from "../../components/SearchProducts.js";
import AdminDashboard from "../../components/AdminDashboard.js";
import { searchProductsByTerms } from "../../utils/productServices.js";

const AdminPage = () => {
  const [searchResults, setSearchResults] = useState([]);

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
      <AdminDashboardLayout />
      <SearchProducts onSearch={handleSearch}/> 
      <AdminDashboard />
      {searchResults.map(product => (
        <div key={product._id}>
          {product.name} - ${product.price}
        </div>
      ))}
    </div>
  );
}

export default AdminPage;
