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
  .put(protect, isAdmin, updateCategory)
  .delete(protect, isAdmin, deleteCategory)

router.route('/:id/subcategory').put(addSubcategory)

export default router
