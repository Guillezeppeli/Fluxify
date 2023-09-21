import mongoose from 'mongoose'

const mongoURI = process.env.MONGO_URI

if (!mongoURI) {
  console.error('MONGO_URI must be defined in the .env file.')
  process.exit(1)
}

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    console.log('MongoDB connected successfully!')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message)
    // Exit process with failure
    process.exit(1)
  }
}

export default connectDB
