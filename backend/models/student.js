const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Student Schema
const studentSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  verificationCode: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: {
      expires: '24h'
    }
  },
  profilePic: {
    type: String,
    default: 'uploads/default_profile_pic.png'
  }
});

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

const Student = mongoose.model('Student', studentSchema);
const TempRegistration = mongoose.model('TempRegistration', studentSchema);

module.exports = {
  Student,
  TempRegistration
};
