const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Client Schema
const clientSchema = new mongoose.Schema({
  clientType: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  website: {
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
  }
});

const tempClientRegistrationSchema = new mongoose.Schema({
  clientType: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  verificationCode: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: {
      expires: '5h'
    }
  }
});

// Middleware to hash password before saving a temp client document
tempClientRegistrationSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const Client = mongoose.model('Client', clientSchema);
const TempClientRegistration = mongoose.model('TempClientRegistration', tempClientRegistrationSchema);

module.exports = {
  Client,
  TempClientRegistration
};
