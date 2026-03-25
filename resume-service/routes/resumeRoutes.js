const express = require('express');
const router = express.Router();
const {
  createOrUpdateResume,
  getResume,
  generatePDF
} = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(protect);

router.route('/')
  .get(getResume)
  .post(createOrUpdateResume);

router.post('/generate-pdf', generatePDF);

module.exports = router;