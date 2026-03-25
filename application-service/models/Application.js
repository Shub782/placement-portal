const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Job'
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  atsScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  status: {
    type: String,
    enum: ['Applied', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Rejected', 'Selected'],
    default: 'Applied'
  },
  appliedDate: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    default: ''
  },
  resumeAnalyzed: {
    type: Boolean,
    default: false
  },
  atsBreakdown: {
    skills: { type: Number, default: 0 },
    experience: { type: Number, default: 0 },
    education: { type: Number, default: 0 },
    projects: { type: Number, default: 0 }
  },
  analyzedAt: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model('Application', ApplicationSchema);