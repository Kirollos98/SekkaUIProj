const Trip = require('../Models/Trip');
const User = require('../Models/User');
const City = require('../Models/City');
const Booking = require('../Models/book');


function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}




const getAllTrips = async (req, res, next) => {
  res.send(await Trip.find({}));
};

const addTrip = (req, res) => {

  console.log("array body", req.body.trips);


  let i = 0
  for ( i ; i < req.body.trips.length; i++) {
    let tripToAdd = new Trip({
      tripNum: req.body.trips[i].tripNum+between(100,500),
      fromId: req.body.trips[i].fromId,
      toId: req.body.trips[i].toId,
      date: req.body.trips[i].date,
      price: req.body.trips[i].price,
      type: req.body.trips[i].type,
      seat: req.body.trips[i].seat,
    });
    tripToAdd.save((err, data) => {
      if (err) {
        console.log(err);

        err.statusCode = 422;

        //next(err);

        res.send(err);
      } else {
        console.log("data added !",data);
        //res.status(200).send(data);
      }
    });

  }
  if(i==req.body.trips.length){
    res.send("all trips are added successfully !");
  }

  // let tripToAdd = new Trip({
  //   tripNum: req.body.tripNum,
  //   fromId: req.body.fromId,
  //   toId: req.body.toId,
  //   date: req.body.date,
  //   price: req.body.price,
  //   type: req.body.type,
  //   seat: req.body.seat,
  // });

  // tripToAdd.save((err, data) => {
  //   if (err) {
  //     console.log(err);

  //     err.statusCode = 422;

  //     //next(err);

  //     res.send(err);
  //   } else {
  //     res.status(200).send(data);
  //   }
  // });
};


const search = async (req, resp) => {
  console.log('start heere from node search');

  let from;
  let to;
  let trip;
  await City.findOne({ cityName: req.body.fromCityName }, (requ, res) => {
    //console.log('gwa', res);
    from = res._id;
    // res.send(res._id);s
  });
  console.log('bara', from);
  await City.findOne({ cityName: req.body.toCityName }, (reqs, ress) => {
    //console.log('gwa', ress);
    to = ress._id;
    // res.send(res._id);
  });
  await Trip.find({ fromId: from, toId: to }, (request, response) => {
    console.log('di trip nod henaaaa', response);

    trip = response;
  });

  // await trip.filter((item)=>{
  //   return item.date.split("T")[0] == req.date
  // })
  //2021-06-18 T 15:33:08.416 Z

  resp.send(trip);
};

//   await Trip.findOne({_id: req.query.}, (requ, res) => {
//     //console.log('gwa', res);
//     from = res._id;
//     // res.send(res._id);s
//   });

const detailTrip = async (req, res) => {
  console.log(req.params);

  await Trip.findOne({ _id: req.params.id })
    .populate('fromId')
    .populate('toId')
    //  .select('cityName')
    .exec((err, trip) => {
      if (!err) {
        console.log(trip);
        res.send(trip);
      } else {
        res.send('errror');
      }
    });
};
//trip => seats => minus => add
const BookingTrip = (req, res) => {
  console.log(req.body, "body here ");
  Trip.findOne({ _id: req.body.tripId }, (err, trip) => {
    console.log('--------+++++++++++-------', trip.seat);
    if (!err) {
      if (trip.seat >= req.body.seats) {
        trip.seat -= req.body.seats;
        console.log('--------+++++++++++-------', trip.seat);
        trip.save((err, data) => {
          if (err) {
            res.write(err);
          } else {
            let newBooking = new Booking({
              UserID: req.body.userId,
              TripID: req.body.tripId,
              seat: req.body.seats,
              date: new Date(),
              rate: 3,
            });

            newBooking.save((err, newBook) => {
              if (err) {
                res.send(
                  'error happened while booking your trip, try again later'
                );
              } else {
                Booking.findOne({ _id: newBook._id }).populate("UserID").populate("TripID").exec((err, bookingConfirmed) => {

                  res.status(200).send(bookingConfirmed);
                })
              }
            });
          }
        });
      } else {
        res.write('No enough seats available  !!');
      }
    }
  });
};




const ListUsersTrips = async (req, resp) => {
  Booking.find({ UserID: req.body.userid })
    .populate({
      path: "TripID",
      populate: {
        path: "fromId",
        model: "City",
      },
    })
    .populate({
      path: "TripID",
      populate: {
        path: "toId",
        model: "City",
      },
    })
    .exec((err, bookingConfirmed) => {
      console.log("list el trip hena ", bookingConfirmed);
      resp.status(200).send(bookingConfirmed);
    });
};



module.exports = {
  addTrip,
  getAllTrips,
  search,
  detailTrip,
  BookingTrip,
  ListUsersTrips,
};
