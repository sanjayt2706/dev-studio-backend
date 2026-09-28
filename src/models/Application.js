const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    referenceNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
      uppercase: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    branch: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: String,
      required: true,
      trim: true,
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    domains: [
      {
        type: String,
        trim: true,
      },
    ],
    motivation: {
      type: String,
      required: true,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
      default: '',
    },
    linkedin: {
      type: String,
      trim: true,
      default: '',
    },
    portfolio: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['PENDING_REVIEW', 'SHORTLISTED', 'ACCEPTED', 'REJECTED'],
      default: 'PENDING_REVIEW',
      index: true,
    },
    submittedAt: {
      type: Date,
      default: () => new Date(),
      index: true,
    },
    reviewNotes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Application', applicationSchema);
