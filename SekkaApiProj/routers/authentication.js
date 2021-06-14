const express = require('express');
const {register} = require("../Controllers/auth-Controller");
const authRouter = express.Router();



//authRouter.post("/login",);
authRouter.post("/register",register);

module.exports = authRouter