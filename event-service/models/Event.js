const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  totalSeats: { type: Number, default: 100 },
  // We'll initialize availableSeats to totalSeats
  availableSeats: { type: Number, default: 100 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', EventSchema);
