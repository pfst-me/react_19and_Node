// controllers/userController.js
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

// Helper: Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
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
      token
    });
  } catch (err) {
    console.error('p->', err);
    
    res.status(500).json({ message: 'Error creating user', error: err });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
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
