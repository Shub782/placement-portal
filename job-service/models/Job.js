const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    default: 'Negotiable',
  },
  requiredSkills: [{
    type: String,
    required: true,
  }],
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
});

module.exports = mongoose.model('Job', JobSchema);