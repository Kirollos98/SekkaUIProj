const express = require('express');
const {addTrip, getAllTrips,search,detailTrip,BookingTrip} = require('../Controllers/trip-Controller');


const tripRouter = express.Router();



tripRouter.post('/addTrip', addTrip);
tripRouter.get('/getAllTrips', getAllTrips);
tripRouter.post('/search', search);
tripRouter.get('/detailTrip/:id', detailTrip);
tripRouter.post('/bookingTrip', BookingTrip);


module.exports = tripRouter;