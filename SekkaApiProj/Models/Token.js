const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
  expiryDate: { type: Date },
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;