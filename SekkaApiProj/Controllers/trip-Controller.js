const Trip = require('../Models/Trip');
const User = require('../Models/User');
const City = require('../Models/City');


const getAllTrips = async (req, res, next) => {
  res.send(await Trip.find({}));
};





const addTrip = (req, res) => {
  let tripToAdd = new Trip({
    tripNum: req.body.tripNum,
    fromId: req.body.fromId,
    toId: req.body.toId,
    date: Date.now(),
    price: req.body.price,
    type: req.body.type,
  });

  tripToAdd.save((err, data) => {
    if (err) {
      console.log(err);

      err.statusCode = 422;

      //next(err);

      res.send(err);
    } else {
      res.status(200).send(data);
    }
  });
};

// fromid 
// toid 
// trip 
const search = async  (req, resp) => {
console.log('start heere from node search');

  let from;
  let to;
  let trip;
  await City.findOne({cityName: req.body.fromCityName}, (requ, res) => {
    //console.log('gwa', res);    
    from = res._id;
    // res.send(res._id);s
  });
  console.log('bara', from);
  await City.findOne({cityName: req.body.toCityName}, (reqs, ress) => {
    //console.log('gwa', ress);
    to = ress._id;
    // res.send(res._id);
  });
await Trip.find({fromId: from, toId:to}, (request, response) => {
    console.log('di trip nod henaaaa', response);

    trip = response;
}); 
  //2021-06-18 T 15:33:08.416 Z

  resp.send(trip);
};

module.exports = {
  addTrip,
  getAllTrips,
  search,
};