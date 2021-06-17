
const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  cityName: { type: String },
});

const City = mongoose.model('City', citySchema);

module.exports = City;