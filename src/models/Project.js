const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  subtitle: { type: String },
  description: { type: String, required: true },
  year: { type: String },
  category: { type: String, required: true },
  badge: { type: String },
  technologies: [{ type: String }],
  coverImage: { type: String },
  gallery: [{ type: String }],
  teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
  githubUrl: { type: String },
  github: { type: String },
  liveDemoUrl: { type: String },
  liveDemo: { type: String },
  caseStudyContent: { type: String },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
