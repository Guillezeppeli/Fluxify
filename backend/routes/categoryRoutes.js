import express from 'express'
import {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getSubcategories,
  addSubcategory,
  updateSubcategory,
  deleteSubcategory
} from '../controllers/categoryController.js'
import isAdmin from '../middleware/adminMiddleware.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
  .get(getCategories)
  .post(protect, isAdmin, addCategory)

router.route('/:id')
  .patch(protect, isAdmin, updateCategory)
  .delete(protect, isAdmin, deleteCategory)

router.route('/:id/subcategories')
  .get(getSubcategories)
  .post(protect, isAdmin, addSubcategory)

router.route('/:id/subcategories/:subcategoryId')
  .patch(protect, isAdmin, updateSubcategory)
  .delete(protect, isAdmin, deleteSubcategory)

export default router
