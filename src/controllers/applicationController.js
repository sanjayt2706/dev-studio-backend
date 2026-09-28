const Application = require('../models/Application');

/**
 * Generate a unique, server-side verified reference number in format DS-XXXXXX
 */
const generateReferenceNumber = async () => {
  const maxAttempts = 10;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const ref = `DS-${randomDigits}`;
    const exists = await Application.exists({ referenceNumber: ref });
    if (!exists) {
      return ref;
    }
  }
  // Fallback in the improbable event of multiple collisions
  return `DS-${Date.now().toString().slice(-6)}`;
};

/**
 * Public: Submit a new membership application
 * POST /api/applications
 */
exports.submitApplication = async (req, res) => {
  try {
    const body = req.body || {};

    const fullName = (body.fullName || body.name || '').trim();
    const email = (body.email || '').trim().toLowerCase();
    const phone = (body.phone || '').trim();
    const branch = (body.branch || '').trim();
    const year = (body.year || '').trim();
    const motivation = (body.motivation || body.reason || '').trim();
    const github = (body.github || '').trim();
    const linkedin = (body.linkedin || '').trim();
    const portfolio = (body.portfolio || '').trim();

    // Normalizing skills / domains
    let skills = [];
    if (Array.isArray(body.skills)) {
      skills = body.skills.map((s) => String(s).trim()).filter(Boolean);
    } else if (Array.isArray(body.domains)) {
      skills = body.domains.map((s) => String(s).trim()).filter(Boolean);
    } else if (typeof body.skills === 'string') {
      skills = body.skills.split(',').map((s) => s.trim()).filter(Boolean);
    }

    const domains = Array.isArray(body.domains)
      ? body.domains.map((d) => String(d).trim()).filter(Boolean)
      : skills;

    // Validation
    if (!fullName) {
      return res.status(400).json({ success: false, message: 'Full name is required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'A valid email address is required.' });
    }

    if (!branch) {
      return res.status(400).json({ success: false, message: 'Academic branch is required.' });
    }

    if (!year) {
      return res.status(400).json({ success: false, message: 'Academic year is required.' });
    }

    if (!motivation || motivation.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a statement/motivation of at least 10 characters.',
      });
    }

    // Generate genuine unique server-side reference number
    const referenceNumber = await generateReferenceNumber();

    const newApplication = new Application({
      referenceNumber,
      fullName,
      email,
      phone,
      branch,
      year,
      skills,
      domains,
      motivation,
      github,
      linkedin,
      portfolio,
      status: 'PENDING_REVIEW',
      submittedAt: new Date(), // UTC timestamp
    });

    const saved = await newApplication.save();

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      referenceNumber: saved.referenceNumber,
      data: saved,
    });
  } catch (error) {
    console.error('Submit application error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while processing your application. Please try again.',
      error: process.env.NODE_ENV !== 'production' ? error.message : undefined,
    });
  }
};

/**
 * Protected Admin: List all applications with filtering and search
 * GET /api/applications
 */
exports.getAllApplications = async (req, res) => {
  try {
    const { status, search, limit = 100, page = 1 } = req.query;
    const filter = {};

    if (status && status !== 'ALL') {
      filter.status = status.toUpperCase();
    }

    if (search && search.trim()) {
      const q = search.trim();
      const searchRegex = new RegExp(q, 'i');
      filter.$or = [
        { fullName: searchRegex },
        { email: searchRegex },
        { referenceNumber: searchRegex },
        { branch: searchRegex },
        { skills: searchRegex },
      ];
    }

    const skip = (Math.max(1, parseInt(page, 10)) - 1) * parseInt(limit, 10);
    const total = await Application.countDocuments(filter);
    const applications = await Application.find(filter)
      .sort({ submittedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10));

    return res.status(200).json({
      success: true,
      total,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error('Get applications error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve applications',
      error: error.message,
    });
  }
};

/**
 * Protected Admin: Get single application details by ID or reference number
 * GET /api/applications/:id
 */
exports.getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    let application = null;

    if (id.startsWith('DS-')) {
      application = await Application.findOne({ referenceNumber: id.toUpperCase() });
    } else {
      application = await Application.findById(id);
    }

    if (!application) {
      return res.status(404).json({
        success: false,
        message: `Application not found for identifier: ${id}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error('Get application error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving application',
      error: error.message,
    });
  }
};

/**
 * Protected Admin: Update application status
 * PUT /api/applications/:id/status
 */
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reviewNotes } = req.body;

    const validStatuses = ['PENDING_REVIEW', 'SHORTLISTED', 'ACCEPTED', 'REJECTED'];
    if (!status || !validStatuses.includes(status.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const updateFields = {
      status: status.toUpperCase(),
    };

    if (reviewNotes !== undefined) {
      updateFields.reviewNotes = String(reviewNotes).trim();
    }

    const updated = await Application.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: `Application status updated to ${updated.status}`,
      data: updated,
    });
  } catch (error) {
    console.error('Update status error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update application status',
      error: error.message,
    });
  }
};

/**
 * Protected Admin: Delete an application
 * DELETE /api/applications/:id
 */
exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Application.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: `Application ${deleted.referenceNumber} deleted successfully`,
    });
  } catch (error) {
    console.error('Delete application error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete application',
      error: error.message,
    });
  }
};
