const express = require("express");
const {payment} = require("../Controllers/paymentController");


const paymentRouter = express.Router();
paymentRouter.post('/create-payment-intent', payment);

module.exports = paymentRouter;