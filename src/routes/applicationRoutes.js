const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

// Public route: submit membership application
router.post('/', applicationController.submitApplication);

// Protected admin routes
router.get('/', protect, applicationController.getAllApplications);
router.get('/:id', protect, applicationController.getApplicationById);
router.put('/:id/status', protect, applicationController.updateApplicationStatus);
router.delete('/:id', protect, applicationController.deleteApplication);

module.exports = router;
