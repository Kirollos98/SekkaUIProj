const mongoose = require('mongoose');

const complainSchema = new mongoose.Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
  tripId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Trip' },
  complain: { type: String },
});

const Complain = mongoose.model('Complain', complainSchema);

module.exports = Complain;