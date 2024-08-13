// models/Salesperson.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SalespersonSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL of the image stored in Cloudinary
  },
  address: {
    type: String,
  },
  otp: {
    type: String,
  },
  otpExpires: {
    type: Date,
  },
  status: {
    type: String,
    default: 'Available',
  },
});

// Hash password before saving the salesperson
SalespersonSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const Salesperson = mongoose.model('Salesperson', SalespersonSchema, 'salesperson');
module.exports = Salesperson;
