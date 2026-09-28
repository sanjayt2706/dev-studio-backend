const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

// Middleware to guarantee an authorization header is present before protect middleware
const requireAuthToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] === 'null' || authHeader.split(' ')[1] === 'undefined') {
    return res.status(401).json({ message: 'Authentication required. Missing Bearer token.' });
  }
  next();
};

// Public route: submit membership application
router.post('/', applicationController.submitApplication);

// Protected admin routes
router.get('/', requireAuthToken, protect, applicationController.getAllApplications);
router.get('/:id', requireAuthToken, protect, applicationController.getApplicationById);
router.put('/:id/status', requireAuthToken, protect, applicationController.updateApplicationStatus);
router.delete('/:id', requireAuthToken, protect, applicationController.deleteApplication);

module.exports = router;
