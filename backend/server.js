require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRouter = require('./studentRoutes');
const editorRouter = require('./editorRoutes');
const clientRouter = require('./clientRoutes');
const signInRoutes = require('./signInRoutes'); 
const passwordResetRoutes = require('./passwordResetRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/creative-hub-db')
  .then(() => console.log('Connected to MongoDB.'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/students', studentRouter);
app.use('/editors', editorRouter);
app.use('/clients', clientRouter);
app.use('/login', signInRoutes);
app.use('/auth', passwordResetRoutes);

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
