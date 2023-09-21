import Category from '../models/categoryModel.js'

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

// Add subcategory
export const addSubcategory = async (req, res) => {
  const categoryId = req.params.id
  const { subcategory } = req.body

  try {
    // Find category by ID and add new subcategory to its subcategory array
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { $push: { subcategory } },
      { new: true } // Return the updated category
    )

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' })
    }

    res.status(200).json(updatedCategory)
  } catch (error) {
    res.status(500).json({ message: 'Error adding subcategory', error: error.message })
  }
}
