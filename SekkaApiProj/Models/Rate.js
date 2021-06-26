const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
  bookingId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Booking' },
  rate: { type: Number },
});

const Rate = mongoose.model('Rate', rateSchema);

module.exports = Rate;