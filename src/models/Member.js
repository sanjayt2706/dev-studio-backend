const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true }, // President, Core Team, Member
  team: { type: String, default: 'Core' }, // Beginner, Intermediate, Advanced, Core
  year: { type: String, default: '3rd Year' },
  branch: { type: String, default: 'Computer Science & Engineering' },
  profileImage: { type: String },
  image: { type: String },
  shortBio: { type: String },
  bio: { type: String },
  skills: [{ type: String }],
  github: { type: String },
  linkedin: { type: String },
  portfolio: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);
