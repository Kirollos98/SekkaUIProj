const express = require('express');
const {addTrip, getAllTrips,search,detailTrip} = require('../Controllers/trip-Controller');


const tripRouter = express.Router();



tripRouter.post('/addTrip', addTrip);
tripRouter.get('/getAllTrips', getAllTrips);
tripRouter.post('/search', search);
tripRouter.get('/detailTrip/:id', detailTrip);


module.exports = tripRouter;