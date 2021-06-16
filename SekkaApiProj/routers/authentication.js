const express = require('express');
const {register,login} = require("../Controllers/auth-Controller");
const authRouter = express.Router();



authRouter.post("/login",login);
authRouter.post("/register",register);

module.exports = authRouter