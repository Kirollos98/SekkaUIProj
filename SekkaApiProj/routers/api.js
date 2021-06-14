const express = require('express');
//const userRouter = require('./users');
const authRouter = require('./authentication');

const apiRouter = express.Router();

//apiRouter.use('/user', userRouter);
apiRouter.use('/auth', authRouter);


module.exports = apiRouter;