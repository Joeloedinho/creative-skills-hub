require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { router: studentRouter, Student } = require('./studentRoutes');
const { router: editorRouter, Editor } = require('./editorRoutes');
const { router: clientRouter, Client } = require('./clientRoutes');
const signInRoutes = require('./signInRoutes'); 
const passwordResetRoutes = require('./passwordResetRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true, 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json());

// Serve static files from the public directory
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/creative-hub-db')
  .then(() => console.log('Connected to MongoDB.'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/students', studentRouter);
app.use('/editors', editorRouter);
app.use('/clients', clientRouter);
app.use('/login', signInRoutes);
app.use('/auth', passwordResetRoutes);
app.use('/uploads', express.static('uploads'));

app.get('/api/admin/stats', async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalEditors = await Editor.countDocuments();
    const totalClients = await Client.countDocuments();

    const stats = {
      totalStudents,
      activeStudents: totalStudents,
      totalEditors,
      activeEditors: totalEditors,
      totalClients,
      activeClients: totalClients,
      totalCourses: 0,
      averageCourseRating: 0,
      totalProjects: 0,
      averageProjectRating: 0,
      reviews: 0
    };

    console.log("Admin stats fetched successfully:", stats);
    res.json(stats);
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).send('Server error');
  }
});

app.get('/studentdata', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'studentData.json');
  console.log('Serving studentData.json from:', filePath);
  res.sendFile(filePath);
});

app.get('/', (req, res) => {
  console.log('Root path accessed.');
  res.send('Welcome to the Creative Hub API.');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Registered routes:');
  console.log('  /students/*');
  console.log('  /editors/*');
  console.log('  /clients/*');
  console.log('  /login'); 
});

app.use('*', (req, res) => {
  console.log(`Unhandled route accessed: ${req.originalUrl}`);
  res.status(404).send({ message: 'Route not found.' });
});
