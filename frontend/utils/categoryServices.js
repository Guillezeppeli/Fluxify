import instance from "./axiosConfig.js";

export const fetchCategories = async () => {
  try {
    const response = await instance.get('/categories');
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
		// Extract error message from API response or fall back to a generic message
		const errorMessage = error.response?.data?.message || 'Failed to fetch categories.';
		throw new Error(errorMessage);
  }
}

export const createCategory = async (categoryData) => {
  try {
    const response = await instance.post('/categories', categoryData,)
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
		const errorMessage = error.response?.data?.message || 'Failed to create category.';
		throw new Error(errorMessage);
  }
};

export const updateCategory = async (categoryId, updatedData) => {
  try {
    const response = await instance.patch(`/categories/${categoryId}`, updatedData);
    return response.data; // This will contain the updated category data
  } catch (error) {
    console.error("API call failed:", error);
    const errorMessage = error.response?.data?.message || 'Failed to update category.';
    throw new Error(errorMessage);
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await instance.delete(`/categories/${categoryId}`);

    return response.data; // This may contain a confirmation message or data related to the deletion
  } catch (error) {
    console.error("API call failed:", error);
    const errorMessage = error.response?.data?.message || 'Failed to delete category.';
    throw new Error(errorMessage);
  }
};

export const fetchSubcategories = async (categoryId) => {
	try {
		const response = await instance.get(`/categories/${categoryId}/subcategories`);
		return response.data;  // This will contain the array of subcategories
	} catch (error) {
		console.error("API call failed:", error);
		const errorMessage = error.response?.data?.message || 'Failed to fetch subcategories.';
		throw new Error(errorMessage);
	}
};

export const createSubcategory = async (categoryId, subcategoryData) => {
  try {
    const response = await instance.post(`/categories/${categoryId}/subcategories`, subcategoryData);
    
    if (response.status !== 200) {
      throw new Error(response.data.message || 'Failed to create subcategory.');
    }

    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    const errorMessage = error.response?.data?.message || 'Failed to create subcategory.';
    throw new Error(errorMessage);
  }
};

export const updateSubcategory = async (categoryId, subcategoryId, updatedData) => {
  try {
    const response = await instance.patch(`/categories/${categoryId}/subcategories/${subcategoryId}`, updatedData);
    console.log('Updated subcategory response:', response.data);
    return response.data; // This will contain the updated subcategory data
  } catch (error) {
    console.error("API call failed:", error);
    const errorMessage = error.response?.data?.message || 'Failed to update subcategory.';
    throw new Error(errorMessage);
  }
};

export const deleteSubcategory = async (categoryId, subcategoryId) => {
  try {
    const response = await instance.delete(`/categories/${categoryId}/subcategories/${subcategoryId}`);
    return response.data; // This may contain a confirmation message or data related to the deletion
  } catch (error) {
    console.error("API call failed:", error);
    const errorMessage = error.response?.data?.message || 'Failed to delete subcategory.';
    throw new Error(errorMessage);
  }
};