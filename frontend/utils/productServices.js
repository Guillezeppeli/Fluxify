import instance from "./axiosConfig.js";

export async function fetchProducts(page = 1, limit = 8) {
  try {
    const response = await instance.get('/products', {
      params: {
        page: page,
        limit: limit
      }
    });
    
    return response.data; 
  } catch (error) {
    console.error("API call failed:", error);
    const errorMessage = error.response?.data?.message || `Failed to fetch products: ${error.message}`;
    throw new Error(errorMessage);
  }
}

export const getProductById = async (productId) => {
  try {
    const response = await instance.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    const errorMessage = error.response?.data?.message || `Failed to fetch product by ID: ${error.message}`;
    throw new Error(errorMessage);
  }
};

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

export const deleteProduct = async (productId) => {
  try {
    const response = await instance.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    const errorMessage = error.response?.data?.message || `Failed to delete product: ${error.message}`;
    throw new Error(errorMessage);
  }
}

export const addProductReview = async (productId, reviewData) => {
  try {
    const response = await instance.post(`/products/${productId}/reviews`, reviewData,);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || `Failed to add review: ${error.message}`;
    throw new Error(errorMessage);
  }
};