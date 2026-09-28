const express = require('express');
const router = express.Router();
const { loginUser, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginUser);
router.get('/profile', protect, getProfile);

module.exports = router;
