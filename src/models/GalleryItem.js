const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema({
  title: { type: String },
  imageUrl: { type: String, required: true },
  category: { type: String },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
}, { timestamps: true });

module.exports = mongoose.model('GalleryItem', galleryItemSchema);
