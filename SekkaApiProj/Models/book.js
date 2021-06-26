// const {Timestamp} = require('mongodb');
const mongoose = require('mongoose');
//userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
const bookingSchema = new mongoose.Schema({
  //   user: {type: String},
  UserID: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
  TripID: {type: mongoose.SchemaTypes.ObjectId, ref: 'Trip'},
  seat: {type: Number},
  date:{type:Date},
  rate:{type:Number}
  // time:{type:Timestamp}
});
//assign the user schema to User Class
const Booking = mongoose.model('Booking', bookingSchema);
Booking.on('index', (err) => {
  console.log(err);
});
module.exports = Booking;
