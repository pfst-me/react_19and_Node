// controllers/userController.js
const User = require('../models/users');
const jwt = require('jsonwebtoken');

// Helper: Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

// Helper: Generate Refresh Token
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id}, process.env.REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_EXPIRY,
  });
};

// Create a new user
exports.createUser = async (req, res) => {
  // console.log(req);
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: `User already exists with email:` + email,
      });
    }

    const user = new User(req.body);
    await user.save();

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      token,
    });
  } catch (err) {
    console.error('Error on register', err);

    res.status(500).json({ message: 'Error creating user', error: err });
  }
};

//Login users
exports.loginUser = async (req, res) => {
  try {
    console.log('login data->', req);

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials.',
      });
    }
    const isMatch = await existingUser.matchPassword(password);
    console.log('match', isMatch);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials.',
      });
    }
    const token = generateToken(existingUser);
    const refreshToken = generateRefreshToken(existingUser);
    console.log('refreshToken->', refreshToken);
    

    // Set refresh token in HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      message: 'Login success',
      token,
    });
  } catch (err) {
    console.error('Error on login', err);
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    const totalCount = await User.countDocuments();

    res.status(200).json({
      success: true,
      users,
      totalRecords: totalCount,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: err,
    });
  }
};
