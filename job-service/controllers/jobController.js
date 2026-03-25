const Job = require('../models/Job');

// @desc    Create a new job posting
// @route   POST /api/jobs
const createJob = async (req, res) => {
  try {
    const { companyName, jobTitle, location, salary, requiredSkills, description, deadline } = req.body;
    const postedBy = req.user.id;

    const job = await Job.create({
      companyName,
      jobTitle,
      location,
      salary,
      requiredSkills,
      description,
      deadline,
      postedBy
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all jobs
// @route   GET /api/jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user is the one who posted
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user is the one who posted
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await job.deleteOne();
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
};