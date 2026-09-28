const express = require('express');
const router = express.Router();

const memberRoutes = require('./memberRoutes');
const announcementRoutes = require('./announcementRoutes');
const projectRoutes = require('./projectRoutes');
const eventRoutes = require('./eventRoutes');
const resourceRoutes = require('./resourceRoutes');
const galleryItemRoutes = require('./galleryitemRoutes');
const authRoutes = require('./authRoutes');
const applicationRoutes = require('./applicationRoutes');

router.use('/auth', authRoutes);
router.use('/members', memberRoutes);
router.use('/announcements', announcementRoutes);
router.use('/projects', projectRoutes);
router.use('/events', eventRoutes);
router.use('/resources', resourceRoutes);
router.use('/gallery', galleryItemRoutes);
router.use('/applications', applicationRoutes);

module.exports = router;
