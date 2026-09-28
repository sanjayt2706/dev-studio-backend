const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      if (token && token !== 'null' && token !== 'undefined') {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded && decoded.id) {
          const user = await User.findById(decoded.id).select('-password');
          if (user) {
            req.user = user;
            return next();
          }
        }
      }
    } catch (error) {
      console.warn('Token verification error:', error.message);
      return res.status(401).json({ message: 'Session expired or invalid token. Please log in again.' });
    }
  }

  // In production, strictly reject unauthenticated mutation requests
  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({ message: 'Authentication required. Missing Bearer token.' });
  }

  // Development-only fallback: allows testing mutations locally
  try {
    const adminUser =
      (await User.findOne({ role: 'admin' }).select('-password')) ||
      (await User.findOne().select('-password'));
    if (adminUser) {
      req.user = adminUser;
      return next();
    }
  } catch (err) {
    console.error('Admin dev fallback error:', err);
  }

  return res.status(401).json({ message: 'Not authorized, please log in as administrator' });
};
