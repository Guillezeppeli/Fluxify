import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  image: { // URL to the category's image/icon
    type: String,
    trim: true
  },
  subcategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcategory'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
})

const Category = mongoose.model('Category', categorySchema)

export default Category
