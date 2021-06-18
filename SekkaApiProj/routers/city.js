const express = require('express');
const {addCity, getAllCities} = require("../Controllers/city-Controller");

const cityRouter = express.Router();

cityRouter.post("/addCity",addCity);
cityRouter.get('/getAllCities', getAllCities);

module.exports = cityRouter