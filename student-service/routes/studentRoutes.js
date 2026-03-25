const express = require('express');
const router = express.Router();
const {
  createOrUpdateProfile,
  getProfile,
  getProfileByUserId,
  addSkill
} = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected (require authentication)
router.use(protect);

router.route('/profile')
  .get(getProfile)
  .post(createOrUpdateProfile);

router.get('/profile/:userId', getProfileByUserId);  // ← ADD THIS LINE
router.post('/skills', addSkill);

module.exports = router;