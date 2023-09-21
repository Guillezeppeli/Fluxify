import jwt from 'jsonwebtoken'

const protect = (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1] // Assuming 'Bearer TOKEN'

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.user
    next()
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' })
  }
}

export default protect
