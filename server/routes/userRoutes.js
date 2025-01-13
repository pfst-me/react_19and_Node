// routes/userRoutes.js
const express = require('express');
const { createUser, getUsers, loginUser } = require('../controller/userController');
const protect = require('../middleware/authMiddleware')
const protectRefresh = require('../middleware/authMiddlewareCookie')

const router = express.Router();

// Route to create a new user
router.post('/register', createUser);

//Route to login user
router.post('/login', loginUser);

// Route to get users
router.get('/getUsers', protect, getUsers)
router.get('/getUsersRefreshToken', protectRefresh, getUsers)

module.exports = router;
