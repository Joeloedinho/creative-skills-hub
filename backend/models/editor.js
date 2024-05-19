const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Editor Schema
const editorSchema = new mongoose.Schema({
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
  yearsOfExperience: {
    type: Number,
    required: true
  },
  skillLevel: {
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

const tempEditorRegistrationSchema = new mongoose.Schema({
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
  yearsOfExperience: {
    type: Number,
    required: true
  },
  skillLevel: {
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

// Middleware to hash password before saving a temp editor document
tempEditorRegistrationSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const Editor = mongoose.model('Editor', editorSchema);
const TempEditorRegistration = mongoose.model('TempEditorRegistration', tempEditorRegistrationSchema);

//module.exports = {
 // Editor,
  //TempEditorRegistration
//};

router.get('/', async (req, res) => {
    try {
      const editors = await Editor.find();
      res.json(editors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  module.exports = { router, Editor };