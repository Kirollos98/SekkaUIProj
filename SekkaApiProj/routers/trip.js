const express = require('express');
const {addTrip, getAllTrips,search} = require('../Controllers/trip-Controller');


const tripRouter = express.Router();



tripRouter.post('/addTrip', addTrip);
tripRouter.get('/getAllTrips', getAllTrips);
tripRouter.post('/search', search);


module.exports = tripRouter;