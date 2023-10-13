import mongoose from 'mongoose';
import User from '../models/userModel.js';
import { connect, closeDatabase } from '../utils/memoryDatabaseServer.js';

describe('User Model Test', () => {
  // Connect to the in-memory database before running any tests
  beforeAll(async () => {
    const inMemoryUri = await connect();
    await mongoose.connect(inMemoryUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  // Clear all test data after every test
  afterEach(async () => {
    await User.deleteMany()
  })

  // Disconnect and close the in-memory database after all tests are done
  afterAll(async () => {
    await mongoose.connection.close()
    await closeDatabase()
  })

  it('create & save user successfully', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: 'password123',
      isAdmin: false
    }
    const validUser = new User(userData)
    const savedUser = await validUser.save()

    // Expect the _id to be defined when successfully saved
    expect(savedUser._id).toBeDefined()
    expect(savedUser.name).toBe(userData.name)
    expect(savedUser.email).toBe(userData.email)
    expect(savedUser.isAdmin).toBe(userData.isAdmin)
    // Ensure the password gets hashed
    expect(savedUser.password).not.toBe(userData.password)
  })

  it('insert user successfully, but the field does not exist in the schema should be undefined', async () => {
    const userWithInvalidField = new User({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: 'password123',
      isAdmin: false,
      nickname: 'JD'
    })
    const savedUserWithInvalidField = await userWithInvalidField.save()
    expect(savedUserWithInvalidField._id).toBeDefined()
    expect(savedUserWithInvalidField.nickname).toBeUndefined()
  })
})
