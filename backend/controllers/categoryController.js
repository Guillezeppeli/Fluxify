import Category from '../models/categoryModel.js'
import Subcategory from '../models/subCategoryModel.js'

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
    res.json(categories)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message })
  }
}

// @desc    Create a new category
// @route   POST /api/categories
// @access  Admin
export const addCategory = async (req, res) => {
  const { name, icon, subcategory } = req.body

  try {
    const categoryExists = await Category.findOne({ name })

    if (categoryExists) {
      return res.status(400).json({ message: 'Category already exists' })
    }

    const category = new Category({
      name,
      icon,
      subcategory
    })

    const createdCategory = await category.save()
    res.status(201).json(createdCategory)
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error: error.message })
  }
}

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Admin
export const updateCategory = async (req, res) => {
  const { name, icon } = req.body

  try {
    const category = await Category.findById(req.params.id)

    if (category) {
      category.name = name || category.name
      category.icon = icon || category.icon

      const updatedCategory = await category.save()
      res.json(updatedCategory)
    } else {
      res.status(404).json({ message: 'Category not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error: error.message })
  }
}

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Admin
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)

    if (category) {
      category.isActive = false
      await category.save()
      res.json({ message: 'Category marked as inactive' })
    } else {
      res.status(404).json({ message: 'Category not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating category status', error: error.message })
  }
}

// Fetches all subcategories
export const getSubcategories = async (req, res) => {
  try {
    const categoryId = req.params.id // Extracting category ID from the route parameter

    // Find the category using the provided ID
    const category = await Category.findById(categoryId).populate('subcategories')

    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }

    res.json(category.subcategories) // Return the subcategories of the found category
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subcategories', error: error.message })
  }
}

// Add subcategory
export const addSubcategory = async (req, res) => {
  const categoryId = req.params.id
  const { subcategoryName } = req.body

  try {
    const category = await Category.findById(categoryId)

    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }

    // Check if subcategory with the same name already exists
    let subcategory = await Subcategory.findOne({ name: subcategoryName })
    if (subcategory) {
      return res.status(400).json({ message: 'Subcategory already exists' })
    }

    // Create new subcategory document
    subcategory = new Subcategory({
      name: subcategoryName,
      category: categoryId
    })

    await subcategory.save()

    // Add the subcategory's ID to the main category's subcategories array
    category.subcategories.push(subcategory._id)
    await category.save()

    res.json(category)
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message })
  }
}

// Update subcategory
export const updateSubcategory = async (req, res) => {
  try {
    const { subcategoryId } = req.params
    const updatedData = req.body

    // Find the subcategory by ID and update it
    const subcategory = await Subcategory.findByIdAndUpdate(subcategoryId, updatedData, {
      new: true, // This option ensures the updated document is returned
      runValidators: true // This option ensures all validations run on the update
    })

    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' })
    }

    res.json({ message: 'Subcategory updated successfully', subcategory })
  } catch (error) {
    res.status(500).json({ message: 'Error updating subcategory', error: error.message })
  }
}

// delete subcategory
export const deleteSubcategory = async (req, res) => {
  try {
    const { subcategoryId } = req.params

    // Find the subcategory by ID and update the isActive field to false
    const subcategory = await Subcategory.findByIdAndUpdate(subcategoryId, { isActive: false }, { new: true })

    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' })
    }

    res.json({ message: 'Subcategory deleted successfully', subcategory })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subcategory', error: error.message })
  }
}
