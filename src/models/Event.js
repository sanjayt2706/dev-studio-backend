const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String },
  location: { type: String },
  description: { type: String, required: true },
  category: { type: String, default: 'Event' },
  organizer: { type: String, default: 'Dev Studio Core Team' },
  poster: { type: String },
  gallery: [{ type: String }],
  registrationUrl: { type: String },
  recap: { type: String },
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['upcoming', 'completed', 'cancelled'], default: 'upcoming' }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
