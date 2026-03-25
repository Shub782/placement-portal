const Application = require('../models/Application');
const axios = require('axios');

// @desc    Apply for a job
// @route   POST /api/applications
const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const studentId = req.user.id;

    // Check if already applied
    const existingApplication = await Application.findOne({ jobId, studentId });
    if (existingApplication) {
      return res.status(400).json({ message: 'Already applied for this job' });
    }

    // Get job details to verify job exists
    try {
      await axios.get(`${process.env.JOB_SERVICE_URL}/api/jobs/${jobId}`);
    } catch (error) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Create application with pending analysis
    const application = await Application.create({
      jobId,
      studentId,
      atsScore: 0,
      status: 'Applied',
      resumeAnalyzed: false
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Analyze resume and calculate ATS score
// @route   POST /api/applications/:id/analyze
const analyzeResume = async (req, res) => {
  try {
    const { id } = req.params;
    
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    if (application.resumeAnalyzed) {
      return res.status(400).json({ message: 'Resume already analyzed' });
    }
    
    // Get job details with token
    const jobRes = await axios.get(`${process.env.JOB_SERVICE_URL}/api/jobs/${application.jobId}`, {
      headers: { Authorization: req.headers.authorization }
    });
    const job = jobRes.data;
    
    // Get student profile with token
    const studentRes = await axios.get(`${process.env.STUDENT_SERVICE_URL}/api/student/profile/${application.studentId}`, {
      headers: { Authorization: req.headers.authorization }
    });
    const student = studentRes.data;
    
    // Calculate ATS score based on:
    // 1. Skills match (60%)
    // 2. Experience match (20%)
    // 3. Education match (10%)
    // 4. Projects match (10%)
    
    let skillsScore = 0;
    let experienceScore = 0;
    let educationScore = 0;
    let projectsScore = 0;
    
    // Skill match calculation (60%)
    const studentSkills = student.skills?.map(s => s.name.toLowerCase()) || [];
    const jobSkills = job.requiredSkills?.map(s => s.toLowerCase()) || [];
    const matchedSkills = studentSkills.filter(s => jobSkills.includes(s));
    skillsScore = jobSkills.length > 0 ? (matchedSkills.length / jobSkills.length) * 60 : 0;
    
    // Experience match (20%)
    experienceScore = student.experience?.length ? Math.min(20, student.experience.length * 5) : 0;
    
    // Education match (10%)
    if (student.cgpa) {
      if (student.cgpa >= 8.5) educationScore = 10;
      else if (student.cgpa >= 8) educationScore = 8;
      else if (student.cgpa >= 7) educationScore = 6;
      else if (student.cgpa >= 6) educationScore = 4;
      else educationScore = 2;
    }
    
    // Projects match (10%)
    projectsScore = student.projects?.length ? Math.min(10, student.projects.length * 2.5) : 0;
    
    const finalScore = Math.round(skillsScore + experienceScore + educationScore + projectsScore);
    
    // Update application with ATS score
    application.atsScore = finalScore;
    application.resumeAnalyzed = true;
    application.atsBreakdown = {
      skills: Math.round(skillsScore),
      experience: experienceScore,
      education: educationScore,
      projects: projectsScore
    };
    application.analyzedAt = new Date();
    await application.save();
    
    res.json({ 
      message: 'Resume analyzed successfully',
      atsScore: finalScore,
      breakdown: {
        skills: Math.round(skillsScore),
        experience: experienceScore,
        education: educationScore,
        projects: projectsScore
      }
    });
  } catch (error) {
    console.error('Error analyzing resume:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all applications for a student
// @route   GET /api/applications/my-applications
const getMyApplications = async (req, res) => {
  try {
    const studentId = req.user.id;
    const applications = await Application.find({ studentId }).sort({ appliedDate: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all applications for a job (recruiter)
// @route   GET /api/applications/job/:jobId
const getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await Application.find({ jobId }).sort({ appliedDate: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update application status (recruiter)
// @route   PUT /api/applications/:id/status
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const application = await Application.findByIdAndUpdate(
      id,
      { status, notes },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  applyForJob,
  analyzeResume,
  getMyApplications,
  getApplicationsByJob,
  updateApplicationStatus
};