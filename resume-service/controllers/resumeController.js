const Resume = require('../models/Resume');
const axios = require('axios');

// @desc    Create or update resume
// @route   POST /api/resume
const createOrUpdateResume = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { template, personalInfo, education, skills, projects, experience, certifications } = req.body;

    let resume = await Resume.findOne({ studentId });

    if (resume) {
      // Update existing resume
      resume = await Resume.findOneAndUpdate(
        { studentId },
        { template, personalInfo, education, skills, projects, experience, certifications, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );
    } else {
      // Create new resume
      resume = await Resume.create({
        studentId,
        template,
        personalInfo,
        education,
        skills,
        projects,
        experience,
        certifications
      });
    }

    res.status(200).json(resume);
  } catch (error) {
    console.error('Resume error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get resume by student ID
// @route   GET /api/resume
const getResume = async (req, res) => {
  try {
    const studentId = req.user.id;
    const resume = await Resume.findOne({ studentId });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Generate PDF from resume
// @route   POST /api/resume/generate-pdf
const generatePDF = async (req, res) => {
  try {
    const studentId = req.user.id;
    const resume = await Resume.findOne({ studentId });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // For now, return resume data
    // PDF generation will be added later
    res.status(200).json({ 
      message: 'PDF generation endpoint - ready',
      resume: resume
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrUpdateResume,
  getResume,
  generatePDF
};