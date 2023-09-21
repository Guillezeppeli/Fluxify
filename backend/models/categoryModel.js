import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    trim: true
  },
  image: { // URL to the category's image/icon
    type: String,
    trim: true
  },
  subcategory: [ // An array to hold subcategory names or IDs
    {
      type: String,
      trim: true
    }
  ],
  isActive: {
    type: Boolean,
    default: true
  }
})

const Category = mongoose.model('Category', categorySchema)

export default Category
