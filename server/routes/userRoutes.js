// routes/userRoutes.js
const express = require('express');
const { createUser, getUsers } = require('../controller/userController');

const router = express.Router();

// Route to create a new user
router.post('/register', createUser);

// Route to get users
router.get('/getUsers', getUsers)


module.exports = router;
