const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String },
  externalUrl: { type: String },
  downloadableFileUrl: { type: String },
  author: { type: String },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
