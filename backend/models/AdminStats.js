

const mongoose = require('mongoose');

const AdminStatsSchema = new mongoose.Schema({
  totalStudents: { type: Number, required: true },
  activeStudents: { type: Number, required: true },
  totalEditors: { type: Number, required: true },
  activeEditors: { type: Number, required: true },
  totalClients: { type: Number, required: true },
  activeClients: { type: Number, required: true },
  totalCourses: { type: Number, required: true },
  averageCourseRating: { type: Number, required: true },
  totalProjects: { type: Number, required: true },
  averageProjectRating: { type: Number, required: true },
  reviews: { type: Number, required: true },
});

module.exports = mongoose.model('AdminStats', AdminStatsSchema);
