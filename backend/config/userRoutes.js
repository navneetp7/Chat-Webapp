const express = require('express');
const {initializeUserData}=require("../data/initialize");
const userRouter= express.Router();
const {registerUser1,registerUser2,registerUser3} =require('../controllers/userControllers');
userRouter.route('/register/step1').post(initializeUserData,registerUser1);
userRouter.route("/register/step2").post(initializeUserData,registerUser2);
userRouter.route("/register/step3").post(initializeUserData,registerUser3);
//userRouter.route('/login').post(userLogin);

module.exports = userRouter;