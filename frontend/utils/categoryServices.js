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
