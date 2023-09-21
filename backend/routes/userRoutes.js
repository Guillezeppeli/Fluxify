import express from 'express'
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile
} from '../controllers/userController.js'
import protect from '../middleware/authMiddleware.js'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/profile')
  .get(protect, getUserProfile)
  .patch(protect, updateUserProfile)
  .delete(protect, deleteUserProfile)

// registration logic
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' })
  }

  const user = new User({
    name,
    email,
    password
  })

  await user.save()

  const payload = {
    user: {
      id: user.id
    }
  }

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '1h' },
    (err, token) => {
      if (err) throw err
      res.json({ token })
    }
  )
})

// Login logic
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' })
  }

  if (!(await user.matchPassword(password))) {
    return res.status(400).json({ message: 'Invalid email or password' })
  }

  const payload = {
    user: {
      id: user.id
    }
  }

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '1h' },
    (err, token) => {
      if (err) throw err
      res.json({ token })
    }
  )
})

export default router
