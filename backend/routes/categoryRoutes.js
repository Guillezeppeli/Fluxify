import express from 'express'
import {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  addSubcategory
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

router.route('/:id/subcategories').post(protect, isAdmin, addSubcategory)

export default router
