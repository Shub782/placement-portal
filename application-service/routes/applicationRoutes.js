const express = require('express');
const router = express.Router();
const {
  applyForJob,
  analyzeResume,
  getMyApplications,
  getApplicationsByJob,
  updateApplicationStatus
} = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(protect);

// Student routes
router.post('/', applyForJob);
router.get('/my-applications', getMyApplications);

// Recruiter routes
router.get('/job/:jobId', getApplicationsByJob);
router.put('/:id/status', updateApplicationStatus);
router.post('/:id/analyze', analyzeResume);  // ← ADD THIS LINE

module.exports = router;