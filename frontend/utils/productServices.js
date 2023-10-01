import instance from "./axiosConfig.js";

export async function fetchProducts() {
  try {
    const response = await instance.get('/products');
    
    return response.data; 
  } catch (error) {
    console.error("API call failed:", error);
    const errorMessage = error.response?.data?.message || `Failed to fetch products: ${error.message}`;
    throw new Error(errorMessage);
  }
}

export async function searchProductsByTerms(searchTerm) {
  try {
    const response = await instance.get(`/products?searchTerm=${searchTerm}`);
    return response.data; 
  } catch (error) {
    console.error("API call failed:", error);
    const errorMessage = error.response?.data?.message || `Failed to search products: ${error.message}`;
    throw new Error(errorMessage);
  }
}

export const createProduct = async (productData) => {
  try {
    const response = await instance.post('/products', productData);
    
    return response.data;  // This will contain the data related to the created product
  } catch (error) {
    console.error("API call failed:", error);
    const errorMessage = error.response?.data?.message || 'Failed to create product.';
    throw new Error(errorMessage);
  }
}

export const updateProduct = async (productId, updatedData) => {
  try {
    const response = await instance.patch(`/products/${productId}`, updatedData);
    
    return response.data; 
  } catch (error) {
    console.error("API call failed:", error);
    const errorMessage = error.response?.data?.message || `Failed to update product: ${error.message}`;
    throw new Error(errorMessage);
  }
}

