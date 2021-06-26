const User = require('../Models/User');
const Complain = require('../Models/Complain');
const Rate = require('../Models/Rate');
const Booking = require('../Models/book');

const editDetails = async (req, res) => {
    console.log("body----", req.body);


    User.updateOne({ email: req.body.email }, { name: req.body.name, city: req.body.city }, (err, updated) => {
        if (err) {
            res.send(err);
        } else {
            console.log("updated ========", updated);

            User.findOne({ email: req.body.email }, (err, user) => {
                if (err) {
                    res.send(err)
                } else {
                    console.log("updated ========", user);

                    res.send(user);
                }
            })
        }
    })
}

const addComplain = async (req, res) => {
    console.log("body ===================>", req.body);


    let newComplain = new Complain({
        userId: req.body.userId,
        bookingId: req.body.bookingId,
        complain: req.body.complain,
    })

    newComplain.save((err, data) => {
        if (err) {
            res.status(400).send({ done: false, error: err });
        } else {
            res.status(200).send({ done: true, complain: data });
        }
    })
}



const addRate = async (req, res) => {
    console.log("body ===================>", req.body);


    let newRate = new Rate({
        userId: req.body.userId,
        bookingId: req.body.bookingId,
        rate: req.body.rate,
    })

    newRate.save((err, data) => {
        if (err) {
            res.status(400).send({ done: false, error: err });
        } else {
            res.status(200).send({ done: true, rate: data });
        }
    })
}


const getRate = (req, res) => {
    console.log("Req==========>", req.params.id);

    Rate.findOne({ bookingId: req.params.id }, (err, data) => {
        console.log(data)
        if (err) {
            res.send(err);
        } else {
            if (data == null) {
                res.send({ rate: 0 });

            } else {

                res.status(200).send({ rate: data.rate });
            }
        }
    })
}

module.exports = {
    editDetails,
    addComplain,
    addRate,
    getRate
}