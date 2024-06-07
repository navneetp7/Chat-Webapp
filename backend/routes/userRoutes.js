const express = require('express');
const userRouter= express.Router();
userRouter.route('/').post(registerUser);
userRouter.route('/login').post(userLogin) ;

module.exports = userRouter;