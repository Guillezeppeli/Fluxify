import mongoose from 'mongoose'
import { connect } from '../utils/memoryDatabaseServer.js'

const defaultURI = process.env.MONGO_URI

let mongoURI = defaultURI

if (process.env.NODE_ENV === 'test') {
  // Use the in-memory database for tests.
  mongoURI = await connect()
}

if (!mongoURI) {
  console.error(`Failed to get MongoDB URI. Currently trying: ${mongoURI}`);
  console.error('MONGO_URI must be defined in the .env file or the memory server connection has failed.')
  process.exit(1)
}

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
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
