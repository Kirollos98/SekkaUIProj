const mongoose = require('mongoose');

const complainSchema = new mongoose.Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
  bookingId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Booking' },
  complain: { type: String },
});

const Complain = mongoose.model('Complain', complainSchema);

module.exports = Complain;