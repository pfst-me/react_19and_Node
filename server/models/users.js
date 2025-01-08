const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define a Mongoose schema and model for your collection
const userSchema = new mongoose.Schema({
  customer_id: Number,
  username: String,
  email: String,
  password: String,
  created_at: {
    type: Date,
    default: Date.now, // This will store the current date and time in ISO format
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);1 
module.exports = User;
