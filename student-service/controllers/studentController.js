const Student = require('../models/Student');

// @desc    Create or update student profile
// @route   POST /api/student/profile
const createOrUpdateProfile = async (req, res) => {
  try {
    // Get userId from the token (req.user.id from auth middleware)
    const userId = req.user.id;
    const { college, branch, cgpa, skills, projects, github, linkedin } = req.body;

    console.log('Creating profile for userId:', userId);

    let student = await Student.findOne({ userId });

    if (student) {
      // Update existing profile
      student = await Student.findOneAndUpdate(
        { userId },
        { college, branch, cgpa, skills, projects, github, linkedin, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );
    } else {
      // Create new profile
      student = await Student.create({
        userId,
        college,
        branch,
        cgpa,
        skills: skills || [],
        projects: projects || [],
        github: github || '',
        linkedin: linkedin || ''
      });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error('Error in createOrUpdateProfile:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get student profile
// @route   GET /api/student/profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const student = await Student.findOne({ userId });

    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get student profile by user ID (for other services)
// @route   GET /api/student/profile/:userId
const getProfileByUserId = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.params.userId });
    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add skill to student profile
// @route   POST /api/student/skills
const addSkill = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, level } = req.body;

    const student = await Student.findOne({ userId });

    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    student.skills.push({ name, level });
    await student.save();

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrUpdateProfile,
  getProfile,
  getProfileByUserId,
  addSkill
};