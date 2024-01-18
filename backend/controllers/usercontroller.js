const asyncHandler = require('express-async-handler') //(see more below the code) middleware for handling exceptions of express routes and passing them to your express error handlers
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken') //generates token at registering and used to verify user in subsequent use
const User = require('../models/userModel')

// Generate token (used in registerUser below)
// the token is stored on the database and use in authenticating subsequent logins and granting access to elements IAW with the users privileges
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body //desctructure

  // Validation
  if (!name || !email || !password) {
    res.status(400) //client error
    throw new Error('Please include all fields')
  }

  // Find if user already exists
  const userExists = await User.findOne({ email })// {email} is an object but using short notation rather than {email: email}

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({ //crease is function on moongose model
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new error('Invalid user data')
  }
})


// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  // Check user and passwords match
  if (user && (await bcrypt.compare(password, user.password))) { //the hashed value of password (from registerUser) is stored on the db, so we re-hash the user's typed in password
    res.status(200).json({ //200 = created
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(401) //unauthorized
    throw new Error('Invalid credentials')
  }
})

// @desc    Get current user
// @route   /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  }
  res.status(200).json(user)
})


module.exports = {
  registerUser,
  loginUser,
  getMe,
}

/* 
The example in the npm page shows this:

express.get('/', asyncHandler(async (req, res, next) => {
    const bar = await foo.findAll();
    res.send(bar)
}))

//* Without asyncHandler you'd need:

express.get('/',(req, res, next) => {
    foo.findAll()
    .then ( bar => {
       res.send(bar)
     } )
    .catch(next); // error passed on to the error handling route
})
*/