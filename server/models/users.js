const mongoose = require('mongoose');

// Define a Mongoose schema and model for your collection
const UserSchema = new mongoose.Schema({
  customer_id: Number,
  username: String,
  email: String,
  password: String,
  created_at: {
    type: Date,
    default: Date.now, // This will store the current date and time in ISO format
  },
});

const User = mongoose.model('User', UserSchema);1 
module.exports = User;
