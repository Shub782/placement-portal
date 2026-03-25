const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  template: {
    type: String,
    enum: ['professional', 'modern', 'minimal'],
    default: 'professional'
  },
  personalInfo: {
    name: String,
    email: String,
    phone: String,
    address: String,
    linkedin: String,
    github: String
  },
  education: [{
    degree: String,
    institution: String,
    year: String,
    percentage: String
  }],
  skills: [String],
  projects: [{
    title: String,
    description: String,
    technologies: [String],
    link: String
  }],
  experience: [{
    title: String,
    company: String,
    duration: String,
    description: String
  }],
  certifications: [{
    name: String,
    issuer: String,
    year: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Resume', ResumeSchema);