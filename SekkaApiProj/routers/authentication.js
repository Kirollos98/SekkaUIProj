const express = require('express');
const {register,login,logout} = require("../Controllers/auth-Controller");
const checkAuth = require("../middleWares/checkAuth");

const authRouter = express.Router();


authRouter.post("/login",login);
authRouter.post("/register",register);
authRouter.post("/logout",checkAuth,logout);

module.exports = authRouter