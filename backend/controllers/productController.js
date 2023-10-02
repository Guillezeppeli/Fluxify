import Product from '../models/productModel.js'
import Category from '../models/categoryModel.js'
import Subcategory from '../models/subCategoryModel.js'
// eslint-disable-next-line no-unused-vars
import Review from '../models/reviewModel.js'

// Fetch All Products and return products based on the query parameters received in the request.
export const getProducts = async (req, res) => {
  const searchTerm = req.query.searchTerm
  const page = Number(req.query.page) || 1 // Default to page 1 if not provided
  const limit = Number(req.query.limit) || 10 // Default to 10 items per page if not provided
  const skip = (page - 1) * limit

  const query = {
    isActive: true
  }

  if (searchTerm) {
    const category = await Category.findOne({ name: new RegExp(searchTerm, 'i') })
    const subcategory = await Subcategory.findOne({ name: new RegExp(searchTerm, 'i') })

    query.$or = [
      { name: new RegExp(searchTerm, 'i') },
      { description: new RegExp(searchTerm, 'i') },
      { category: category ? category._id : null },
      { subcategory: subcategory ? subcategory._id : null }
    ]
  }

  try {
    const products = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .populate('category')
      .populate({
        path: 'subcategory',
        select: 'name -_id' // Fetch only the name of the subcategory and exclude its _id
      })
      .populate('reviews')
      .exec()

    // Get the total count of products for pagination metadata
    const total = await Product.countDocuments(query)

    res.json({
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      products
    })
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message })
  }
}

// Fetch a Single Product by ID:
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category')
      .populate('subcategory')
      .populate('reviews')

    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message })
  }
}

// Add a New Product:
export const createProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    stock,
    categoryId,
    subcategoryId,
    imageURL,
    rating,
    reviews
  } = req.body

  try {
    const category = await Category.findById(categoryId)
    const subcategory = await Subcategory.findById(subcategoryId)

    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }

    if (!subcategory || String(subcategory.category) !== String(categoryId)) {
      return res.status(400).json({ message: 'Invalid subcategory for this category' })
    }

    const product = new Product({
      name,
      description,
      price,
      stock,
      category: categoryId,
      subcategory: subcategoryId, // We're saving the subcategory ID here
      imageURL,
      rating,
      reviews
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message })
  }
}

// Update a Product:
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      Object.assign(product, req.body)
      await product.save()
      res.json(product)
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error: error.message })
  }
}

// Delete a Product:
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      product.isActive = false
      await product.save()
      res.json({ message: 'Product marked as inactive' })
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating category status', error: error.message })
  }
}

// get a review
export const getProductReviews = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('reviews')

  if (product) {
    res.json(product.reviews)
  } else {
    res.status(404).json({ message: 'Product not found' })
  }
}

// Add a review
export const addReview = async (req, res) => {
  const { id } = req.params // Destructure the id directly

  const { rating, comment } = req.body
  const { id: _id, name } = req.user // Destructure the user details
  console.log('User ID from request:', _id)

  const product = await Product.findById(id)

  if (product) {
    // Check if the user already wrote a review
    const existingReview = product.reviews.find(r => r.user.toString() === _id.toString())
    if (existingReview) {
      return res.status(400).json({ message: 'User already reviewed this product' })
    }

    const review = {
      name,
      rating: Number(rating),
      comment,
      user: _id
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save()

    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404).json({ message: 'Product not found' })
  }
}

// Update a review
export const updateProductReview = async (req, res) => {
  try {
    const { id, reviewId } = req.params // Using destructuring to extract both IDs
    const { rating, comment } = req.body

    const product = await Product.findById(id)

    if (!product) {
      throw new Error('Product not found')
    }

    const review = product.reviews.id(reviewId) // Use the 'id' method to fetch a subdocument by its ID

    if (!review) {
      throw new Error('Review not found')
    }

    // Update the review details
    if (rating) review.rating = rating
    if (comment) review.comment = comment

    await product.save()

    res.status(200).json({ message: 'Review updated successfully!' })
  } catch (error) {
    // Based on the error message, decide the appropriate status code
    if (error.message.includes('not found')) {
      res.status(404).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'Error updating review', error: error.message })
    }
  }
}

// Delete a review
export const softDeleteReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      const review = product.reviews.find(r => r._id.toString() === req.params.reviewId)

      if (review) {
        review.isActive = false // Set the review to inactive
        await product.save()
        res.json({ message: 'Review marked as inactive successfully!' })
      } else {
        res.status(404).json({ message: 'Review not found' })
      }
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating review', error: error.message })
  }
}
