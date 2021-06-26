const express = require('express');
 const {editDetails, addComplain,addRate,getRate} = require("../Controllers/user-Controller");

const userRouter = express.Router();

 userRouter.put("/editUser",editDetails);
 userRouter.post('/add-complain', addComplain);
 userRouter.post('/add-rate', addRate);
 userRouter.get('/get-rate/:id', getRate);

module.exports = userRouter