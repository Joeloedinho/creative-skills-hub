//const express = require('express');
const jwt = require('jsonwebtoken');
//const mongoose = require('mongoose');
//const router = express.Router();
const studentRouter = require('./studentRoutes');
const express = require('express');
//const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { generateVerificationCode, sendVerificationEmail } = require('./utils');
const saltRounds = 10;
const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Student Schema
const studentSchema = new mongoose.Schema({
  fullname: String,
  gender: String,
  phone: String,
  email: { type: String, unique: true },
  password: String,
  verificationCode: String,
  createdAt: { type: Date, default: Date.now, index: { expires: '24h' } },
});

const Student = mongoose.model('Student', studentSchema);

const TempRegistration = mongoose.model('TempRegistration', studentSchema);

// Middleware to hash password before saving a document
studentSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error('Error hashing password:', error);
    next(error);
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '/uploads')); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // Use Date.now() to make each filename unique
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
      cb(null, true);
  } else {
      cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 1024 * 1024 * 5 } });

module.exports = { Student, TempRegistration };
