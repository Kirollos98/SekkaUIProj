const express = require('express');
//const userRouter = require('./users');
const authRouter = require('./authentication');
const cityRouter = require('./city')
const apiRouter = express.Router();

//apiRouter.use('/user', userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/city',cityRouter);

module.exports = apiRouter;