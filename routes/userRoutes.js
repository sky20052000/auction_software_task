const express = require("express");
const userController = require("../controller/userController");
const userRouter = express.Router();

userRouter.post("/create", userController.addUser);
userRouter.post("/login", userController.userLogin);


module.exports = userRouter