const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next() // If the user is an admin, proceed to the next middleware or route handler
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' })
  }
}

export default isAdmin
