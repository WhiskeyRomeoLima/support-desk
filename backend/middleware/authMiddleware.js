const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
//wb@gmail.com 1234
const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header.  It is formatted as a string 'bearer token' where token is the jwt code
      token = req.headers.authorization.split(' ')[1] //split into an array.  the token is now at position 1 in the array.
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET) //decoded has the user id in it
      // Get user from token
      req.user = await User.findById(decoded.id).select('-password') //exclude password from select statement
      // NOTE: We need to check if a user was found
      // https://www.udemy.com/course/react-front-to-back-2022/learn/lecture/30591026#questions/17843570
      if (!req.user) {
        res.status(401)
        throw new Error('Not authorized')
      }

      next()
      
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized')
  }
})

module.exports = { protect }