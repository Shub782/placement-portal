const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  college: {
    type: String,
    default: ''
  },
  branch: {
    type: String,
    default: ''
  },
  cgpa: {
    type: Number,
    default: 0
  },
  skills: [{
    name: String,
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' }
  }],
  projects: [{
    title: String,
    description: String,
    technologies: [String],
    link: String
  }],
  github: {
    type: String,
    default: ''
  },
  linkedin: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Student', StudentSchema);