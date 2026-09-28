const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  content: { type: String, required: true },
  coverImage: { type: String },
  image: { type: String },
  author: { type: String },
  publishDate: { type: Date, default: Date.now },
  publishedAt: { type: String },
  featured: { type: Boolean, default: false },
  pinned: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  externalLink: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Announcement', announcementSchema);
