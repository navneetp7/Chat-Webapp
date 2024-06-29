const express = require('express');
const userRouter= express.Router();
const {registerUser1,registerUser2,registerUser3, authUser} =require('../controllers/userControllers');
userRouter.route('/register/step1').post(registerUser1);
userRouter.route("/register/step2").post(registerUser2);
userRouter.route("/register/step3").post(registerUser3);
userRouter.route('/login').post(authUser);

module.exports = userRouter;
