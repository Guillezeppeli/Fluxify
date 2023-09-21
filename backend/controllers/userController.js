import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const registerUser = async (req, res) => {
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
      res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
    }
  )
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    const payload = {
      user: {
        id: user.id,
        name: user.name, // Added the name to the payload
        isAdmin: user.isAdmin // Added the isAdmin status to the payload
      }
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
          }
        })
      }
    )
  } else {
    res.status(401).json({ message: 'Invalid email or password' })
  }
}

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private

export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password // This should get hashed automatically by the pre-save hook
    }

    const updatedUser = await user.save()

    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email
    })
  } else {
    res.status(404).json({ message: 'User not found' })
  }
}

export const deleteUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    if (user) {
      user.isActive = false
      await user.save()
      res.json({ message: 'User marked as inactive ' })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user status', error: error.message })
  }
}
