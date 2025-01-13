const jwt = require('jsonwebtoken');
const User = require('../models/users');

const protectRefresh = async (req, res, next) => {
  const { refreshToken } = req.cookies; // Get refreshToken from cookies
  console.log('cookie->', req.cookie);
  

  if (!refreshToken) {
    return res.status(401).json({ message: 'Not authorized, no refresh token' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET); // Verify the refresh token
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ message: 'Not authorized, refresh token failed' });
  }
};

module.exports = protectRefresh;
