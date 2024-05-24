const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { generateVerificationCode, sendVerificationEmail } = require('./utils');
const saltRounds = 10;
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/authenticateToken');
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

// multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
      if (!req.user || !req.user.email) {
          return cb(new Error('User email is not available'), false);
      }
      const extension = file.originalname.split('.').pop();
      const filename = `${req.user.email.replace(/[@.]/g, '_')}-${Date.now()}.${extension}`;
      cb(null, filename);
  }
});

const upload = multer({ storage: storage });

// Update Student endpoint
router.post('/updateProfile', authenticateToken, upload.single('profilePic'), async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized access: No user found" });
  }

  const { id } = req.user;
  const { fullname, gender, phone, email, dateJoined } = req.body;
  const profilePic = req.file ? req.file.path.replace(/\\/g, '/') : undefined;  

  try {
    const updatedData = {
      fullname,
      gender,
      phone,
      email,
      dateJoined,
      ...(profilePic && { profilePic })  
    };

    const student = await Student.findByIdAndUpdate(id, updatedData, { new: true });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    
    const filePath = path.join(__dirname, 'public', 'studentData.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Failed to read student data file:', err);
        return;
      }
      let existingData = JSON.parse(data);
      const studentIndex = existingData.findIndex((s) => s.email === email);
      if (studentIndex !== -1) {
        existingData[studentIndex] = { ...existingData[studentIndex], ...updatedData };
      } else {
        existingData.push(updatedData);
      }
      fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (err) => {
        if (err) {
          console.error('Failed to update student data file:', err);
        }
      });
    });

    res.json({ message: 'Profile updated successfully', data: student });
  } catch (error) {
    console.error('Error updating student profile:', error);
    res.status(500).send({ message: "Error updating student profile.", error: error.message });
  }
});



//fetch profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await Student.findById(req.user.id);
    if (!user) {
      console.error('No user found with ID:', req.user.id);
      return res.status(404).json({ message: "User not found" });
    }

    const filePath = path.join(__dirname, 'public', 'studentData.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Failed to read student data file:', err);
        return res.status(500).send({ message: 'Error fetching student profile.', error: err.toString() });
      }

      const students = JSON.parse(data);
      const studentData = students.find(s => s.email === user.email);

      // Construct the URL for the profile picture using data from studentData.json if available
      const profilePicUrl = studentData && studentData.profilePic
        ? `${req.protocol}://${req.get('host')}/${studentData.profilePic}`
        : `${req.protocol}://${req.get('host')}/uploads/default_profile_pic.png`;

      console.log('Sending user data with profile pic:', {
        ...user._doc,
        profilePic: profilePicUrl
      });

      res.json({
        fullname: user.fullname,
        gender: user.gender,
        email: user.email,
        phone: user.phone,
        dateJoined: user.createdAt.toISOString().substring(0, 10),
        profilePic: profilePicUrl
      });
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).send({ message: 'Error fetching student profile.', error: error.toString() });
  }
});



router.post('/register_student', async (req, res) => {
  const verificationCode = generateVerificationCode();
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const tempRegistrationData = {
      ...req.body,
      verificationCode,
      password: hashedPassword,
    };
    const tempRegistration = new TempRegistration(tempRegistrationData);
    await tempRegistration.save();
    console.log('Temporary registration saved:', tempRegistration);

    // Update the studentData.json file
    const filePath = path.join(__dirname, 'public', 'studentData.json');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          // File does not exist, create it
          fs.writeFile(filePath, JSON.stringify([tempRegistrationData]), { flag: 'wx' }, (err) => {
            if (err) {
              console.error('Failed to create student data file:', err);
              return;
            }
            console.log('Student data file created and saved!');
          });
        } else {
          console.error('Error reading student data file:', err);
        }
      } else {
        // File exists, append new student data
        let existingData = [];
        try {
          existingData = JSON.parse(data);
        } catch (parseErr) {
          console.error('Failed to parse existing student data:', parseErr);
           
        }
        existingData.push(tempRegistrationData);
        fs.writeFile(filePath, JSON.stringify(existingData), (err) => {
          if (err) {
            console.error('Failed to update student data file:', err);
            return;
          }
          console.log('Student data updated successfully!');
        });
      }
    });

    await sendVerificationEmail(req.body.email, verificationCode);
    res.status(201).send({ message: "Student registration initiated. Please check your email for verification." });
  } catch (error) {
    console.error('Error during student registration:', error);
    res.status(500).send({ message: "Error processing student registration." });
  }
});



// Verify Email
router.post('/verify_email', async (req, res) => {
  const { email, verificationCode } = req.body;
  try {
    const tempReg = await TempRegistration.findOne({ email, verificationCode });
    if (!tempReg) {
      return res.status(400).send({ message: 'Invalid or expired verification code.' });
    }

    
    const userType = 'student'; 
    const user = new Student(tempReg.toObject());
    await user.save();
    await TempRegistration.deleteOne({ email: tempReg.email });

    console.log({ message: 'Email verified and user registered successfully.', userType: userType });
    res.status(200).send({
      message: 'Email verified and user registered successfully.',
      userType: userType
    });
  } catch (error) {
    console.error('Verification failed:', error);
    res.status(500).send({ message: 'Verification failed. Please try again later.' });
  }
});

const reviewsFilePath = path.join(__dirname, 'public', 'reviews.json');

router.post('/submitReview', authenticateToken, async (req, res) => {
  const reviewText = req.body.review;
  const userEmail = req.user.email;

  if (!reviewText) {
    return res.status(400).json({ message: "Review content is empty." });
  }

  try {
    const students = JSON.parse(fs.readFileSync('public/studentData.json', 'utf8'));
    const user = students.find(student => student.email === userEmail);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}/`;
    const profilePicUrl = user.profilePic ? baseUrl + user.profilePic : baseUrl + "uploads/default_avatar.png";

   
    const now = new Date();
    const dateTime = now.toISOString();  
    const reviewData = {
      email: user.email,
      review: reviewText,
      profilePic: profilePicUrl, 
      role: "Student",
      dateTime: dateTime  
    };

    const reviews = JSON.parse(fs.readFileSync(reviewsFilePath, 'utf8') || "[]");
    reviews.push(reviewData);
    fs.writeFileSync(reviewsFilePath, JSON.stringify(reviews, null, 2));
    res.json({ message: "Review submitted successfully!", review: reviewData });
  } catch (error) {
    console.error('Error during review submission:', error);
    res.status(500).send({ message: "Internal server error", error: error.toString() });
  }
});





// GET endpoint to fetch all reviews
router.get('/reviews', authenticateToken, (req, res) => {
  try {
    const reviewsData = fs.readFileSync(reviewsFilePath, 'utf8');
    const reviews = JSON.parse(reviewsData || "[]");

    
    res.json(reviews);
  } catch (error) {
    console.error('Error reading or parsing reviews file:', error);
    res.status(500).send({ message: "Failed to handle reviews data.", error: error.toString() });
  }
});

router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = { router, Student };