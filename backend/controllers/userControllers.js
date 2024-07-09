const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const generateToken =require("../config/generateToken");
const generateOTP=require("../utils/otp-generator");
const sendEmail= require("../utils/nodemailer");
//const redisClient = require ("../config/redisClient");
const OTPStore = new Map(); // In-memory storage for OTPs

const registerUser1 = asyncHandler(async (req, res ) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Please enter a email");
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.status(400);
    throw new Error("Please enter valid webmail");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const otp = generateOTP();
  //await redisClient.setEx(webmail, 600, otp); // Store OTP in Redis with a TTL of 600 seconds (10 minutes)
  OTPStore.set(email, otp);
  await sendEmail(email, "OTP VERIFICATION", `Your OTP is ${otp}`);
  req.userData = { email };
  res.status(200).json({ message: "Webmail accepted,OTP sent" });
  //next();
});

const registerUser2 = asyncHandler(async (req, res ) => {
  const { otp } = req.body;
  const email = req.userData ? req.userData.email : req.body.email;
  // res.status(200).json({message:"OTP yet to be done",webmail});
  if (!otp) {
    res.status(400);
    throw new Error("Please enter otp");
  }
  const storedOTP = OTPStore.get(email);
  //const storedOTP = await redisClient.get(webmail); // Retrieve OTP from Redis
  if (storedOTP && storedOTP == otp) {
  OTPStore.delete(email);
   // await redisClient.del(webmail); 
    req.userData = { email };
    res.status(200).json({ message: "OTP verified", email });
  } else {
    res.status(400);
    throw new Error("Invalid OTP");
  }
  //next();
});

const registerUser3 = asyncHandler(async (req,res) =>{
  let { name , password, profilepicture }= req.body;
  const email = req.userData ? req.userData.email : req.body.email;
  name=name.trim();
  password=password.trim();
  if (!name || !password) {
        res.status(400);
        throw new Error("Empty Input Fields");
  } else if (!/^[a-zA-Z]*$/.test(name)){
        res.status(400);
        throw new Error("Please enter valid name with alphabets only");
  } else if (password.length <8){
        res.status(400);
        throw new Error("Password is too short.Enter a password longer than 8 characters");
  }
  
  const user = await User.create({
    name,
    email,
    password,
    profilepicture,
  });
   if (user) {
      res.status(201).json({
          _id:user._id,
          name:user.name,
          email:user.webmail,
          password:user.password,
          profilepicture:user.profilepicture,
          token:generateToken(user._id),
        })
    } else{
    res.status(400);
    throw new Error("Failed to Create the User");
  }
});

const authUser = asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const user = await User.findOne({
      webmail: new RegExp(`^${email}$`, "i"),
    });
    if (!user) console.log("User not found");
    if (user && (await user.matchPassword(password)))
    {
      res.json({
        _id:user._id,
        name:user.name,
        email:user.webmail,
        profilepicture:user.profilepicture,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
    
});
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = {registerUser1,registerUser2,registerUser3,authUser,allUsers};
