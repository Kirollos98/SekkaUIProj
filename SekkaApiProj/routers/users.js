const express = require('express');
 const {editDetails, addComplain} = require("../Controllers/user-Controller");

const userRouter = express.Router();

 userRouter.put("/editUser",editDetails);
 userRouter.post('/add-complain', addComplain);

module.exports = userRouter