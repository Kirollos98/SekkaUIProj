const express = require('express');
//const userRouter = require('./users');
const authRouter = require('./authentication');
const cityRouter = require('./city');
const tripRouter = require('./trip');
const paymentRouter = require("./payment");
const userRouter = require("./users");
const apiRouter = express.Router();

//apiRouter.use('/user', userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/city', cityRouter);
apiRouter.use('/trip', tripRouter);
apiRouter.use('/payment', paymentRouter);
apiRouter.use('/user', userRouter);

module.exports = apiRouter;