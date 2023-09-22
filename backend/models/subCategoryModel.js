import mongoose from 'mongoose'

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  image: { // URL to the subcategory's image/icon
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
})

const Subcategory = mongoose.model('Subcategory', subcategorySchema)

export default Subcategory
