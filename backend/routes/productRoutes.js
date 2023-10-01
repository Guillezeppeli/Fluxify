import express from 'express'
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductReviews,
  addReview,
  updateProductReview,
  softDeleteReview
} from '../controllers/productController.js'
import protect from '../middleware/authMiddleware.js'
import isAdmin from '../middleware/adminMiddleware.js'

const router = express.Router()

// Fetch all products
router.route('/').get(getProducts)

// Add a new product (only for admins)
router.route('/').post(protect, isAdmin, createProduct)

// Fetch single product, update, and delete
router.route('/:id').get(getProductById).patch(protect, isAdmin, updateProduct).delete(protect, isAdmin, deleteProduct)

// fecth a review by ID

router.route('/:id/reviews').get(getProductReviews)

// Add a review
router.route('/:id/reviews').post(protect, addReview)

// Update Review
router.route('/:id/reviews/:reviewId').patch(protect, updateProductReview)

// Delete Review
router.route('/:id/reviews/:reviewId').delete(protect, softDeleteReview)

export default router
